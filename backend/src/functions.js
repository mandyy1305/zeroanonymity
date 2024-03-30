import { FieldPath, Firestore, addDoc, arrayUnion, collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import {db} from "./firebase"
import { startHeartbeat } from "./HeartBeatSignal";
import { setSpectatorMode, setUser_1, spectatorMode, timeOutValue, user_1, user_2 } from "./GlobalValues";

export let heartBeatId;

//#region ----- HELPER FUNCTIONS -----
export const locatlDate = (utcTime) => {
    const date = new Date(utcTime)
    const localDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    return localDate.toISOString();
}

const chatIdOrder = async (user_1, user_2) =>{ 
    if(user_1>user_2){
        [user_1, user_2] = [user_2, user_1];
    }
    return user_1 + '+' + user_2;
}

//#endregion

//#region LOGIN-LOGOUT
export const login = async (user_id) => {
    
    try {
        
        const collectionRef = collection(db, "users");
        const docID = user_id;
        const docRef = doc(collectionRef, docID);
        const docSnap = await getDoc(docRef);

        const userFullAccess = async () => {
            // function to give full access to user while log in
            setSpectatorMode(false)
            setUser_1(user_id)
            await updateDoc(docRef, {
                isActive: true,
                lastActive: new Date().toISOString()
            })

            //start heartbeat signals upon successful login
            //heartBeatId = startHeartbeat(user_id);

            console.log("FullAccess" + spectatorMode);
        }
        const userPartialAccess = async () => {
            // function to give partial access to user while log in
            setSpectatorMode(true)
            console.log("PartialAccess" + spectatorMode);
        }


        if(docSnap.exists()){
            //if user exists, check for spectator mode
            if(docSnap.data().isActive){
                //get the last login timestamp to check if it is still active
                const lastLoginDate = new Date(docSnap.data().lastActive);
                const currentDate = new Date();
                const timeDiff = (currentDate-lastLoginDate) / (1000*60);

                //timeout if prev user foes not logout and his browser crashed or sum
                if(timeDiff > timeOutValue){
                    //user has full access
                    await userFullAccess();
                }
                else{
                    //user can only spectate
                    userPartialAccess();
                }
            }
            else{
                //user has full access
                await userFullAccess();
            }
        }
        else{
            //CREATE USER
            //create a doc in firestore if user does not already exist
            await setDoc(docRef, {
                isActive: true,
                lastActive: new Date().toISOString(),
                chatList: []
            });
            setSpectatorMode(false)
            console.log("Document written with ID: ", docRef.id);
        }
        
    }
    catch (e) {
        console.error("Error adding document: ", e);
    }    
}

export const logout = async (user_id) => {
    try{
        const collectionRef = collection(db, "users");
        const docRef = doc(collectionRef,  user_id)
        const docSnap = await updateDoc(docRef, {
            isActive: false
        })

        setUser_1("")
    }
    catch (e) {
        console.error("Error adding document: ", e);
        
    }  
}
//#endregion

//#region CREATE CHAT
export const checkChatExistence = async (user_2) => {
    //KUCH TOH LIKHNA BAAKI HAI    
}

const addUserToChatList = async (user_1, user_2) => {
    try{
        const collectionRef = collection(db, "users");
        const docRef = doc(collectionRef, user_1);
        const docSnap = await getDoc(docRef);

        if(!docSnap.exists()){
            //CREATE USER
            //create a doc in firestore if user does not already exist
            await setDoc(docRef, {
                isActive: true,
                lastActive: new Date().toISOString(),
                chatList: {}
            });
            console.log("Document written with ID: ", docRef.id);
        }
        await setDoc(docRef, {
            chatList:{
                [user_2] : serverTimestamp()
            }
        }, { merge: true })
    }
    catch (e) {
        console.error("Error adding document: ", e);
    }
}
export const createChat = async (user_1, user_2) => {
    
    // Adding user_2 to chatList of user_1
    addUserToChatList(user_1, user_2)

    // Adding user_1 to chatList of user_2
    addUserToChatList(user_2, user_1)

    //Creating a chat record between the two users.
    try{
        const collectionRef = collection(db, "chats");
        const docRef = doc(collectionRef, await chatIdOrder(user_1, user_2) )
        const docSnap = await setDoc(docRef, {
            user_1: user_1,
            user_2: user_2,
            unopened_msgs: 0 
        });
        console.log("Document written with ID: ", docRef.id);
    }
    catch (e) {
        console.error("Error adding document: ", e);
    }    
}
//#endregion

//#region SEND CHAT
const setChatDocument = async (user_1, user_2, message, messageId, createdAt ) =>{
    try{
        // senderId == user_1
        const chatId = await chatIdOrder(user_1, user_2)
        //const messageId = new Date().toISOString() + "+" + user_1;
        const collectionRef = collection(db, 'chats', chatId, 'messages');
        const docRef = doc(collectionRef, messageId);

        const docSnap = await setDoc(docRef, {
            message: message,
            senderId: user_1,
            createdAt: createdAt
        });
        console.log("Document written with ID: ", docRef.id);
    }
    catch(e){
        console.error("Error adding document: ", e);
    }
}
const setCreatedAt = async (user_1, user_2, createdAt) =>{
    console.log(user_2)
    try{
        const collectionRef = collection(db, 'users');
        const docRef = doc(collectionRef, user_1);
        const docSnap = await setDoc(docRef, {
            chatList: {[user_2]: createdAt}
        }, { merge: true });
        console.log("Latest message updated with ID: ", docRef.id);
    }
    catch(e){
        console.error("Error adding document: ", e);
    }
}

export const sendChat = async (user_1, user_2, message, messageId, createdAt ) => {
    setChatDocument(user_1, user_2, message, messageId, createdAt );
    setCreatedAt(user_1, user_2, createdAt);
    setCreatedAt(user_2, user_1, createdAt);
}
//#endregion

//#region RETRIEVING CHATS & CHATLISTS BETWEEN FROM DB
export const getChatListListener = (user_1, callback) => {
    const docRef = doc(db, 'users', user_1); // Replace 'your_collection_name' with the name of your collection
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
        if(docSnapshot.exists()){
            const dataArray = Object.entries(docSnapshot.data().chatList);
            // Sort the array based on timestamps
            dataArray.sort((a, b) => {
                const aSeconds = a[1]; // Use 0 if a[1].seconds is null or undefined
                const bSeconds = b[1]; // Use 0 if b[1].seconds is null or undefined
                if (aSeconds === null && bSeconds === null) {
                    return 0;
                } else if (aSeconds === null) {
                    return -1;
                } else if (bSeconds === null) {
                    return 1;
                } else {
                    return bSeconds - aSeconds;
                }
            });
            // Extract names from sorted array
            const sortedNames = dataArray.map(([name, _]) => name);
            callback(sortedNames); // Callback function to handle the snapshot data in the component
        }
    });
  
    // Return the unsubscribe function to allow cleanup when component unmounts
    return unsubscribe;
  };

export const getChatsListener = async (user_1, user_2, callback) => {

    // Wait for chatIdOrder() to complete
    const chatId = await chatIdOrder(user_1, user_2);

    const q = query(collection(db, "chats", chatId, "messages"), orderBy('createdAt', 'desc'), limit(50));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        if(user_1!="" && user_2!=""){  
            const formattedData = snapshot.docs.reduce((acc, doc) => {
                acc[doc.id] = doc.data();
                return acc;
            }, {});    
            // Set the transformed data to state
            callback(formattedData)   
        }
        // Handle snapshot data
    });
    // Return the unsubscribe function directly
    return unsubscribe;
};

//#endregion




