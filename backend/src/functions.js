import { FieldPath, Firestore, addDoc, arrayUnion, collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import {db} from "./firebase"
import { startHeartbeat } from "./HeartBeatSignal";
import { setSpectatorMode, spectatorMode, timeOutValue } from "./GlobalValues";

export let heartBeatId;

export const funcs = () => {
    return spectatorMode
}

// ----- HELPER FUNCTIONS -----
export const locatlDate = (utcTime) => {
    const date = new Date(utcTime)
    const localDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    return localDate.toISOString();
}

export const timeDiff = (time) => {

}

const chatIdOrder = async (user_1, user_2) =>{ 
    if(user_1>user_2){
        [user_1, user_2] = [user_2, user_1];
    }
    return user_1 + '+' + user_2;
}

//-----------------------------

export const login = async (user_id) => {
    
    try {
        
        const collectionRef = collection(db, "users");
        const docID = user_id;
        const docRef = doc(collectionRef, docID);
        const docSnap = await getDoc(docRef);

        const userFullAccess = async () => {
            // function to give full access to user while log in
            setSpectatorMode(false)
            await updateDoc(docRef, {
                lastActive: new Date().toISOString()
            })

            //start heartbeat signals upon successful login
            heartBeatId = startHeartbeat(user_id);

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
                    userFullAccess();
                }
                else{
                    //user can only spectate
                    userPartialAccess();
                }
            }
            else{
                //user has full access
                userFullAccess();
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
            spectatorMode = false;
            console.log("Document written with ID: ", docRef.id);
        }
        
    }
    catch (e) {
        console.error("Error adding document: ", e);
    }    
}


export const checkChatExistence = async (user_2) => {
    
}

export const createChat = async (user_1, user_2) => {
    
    // Adding user_2 to chatList of user_1
    try{
        const collectionRef = collection(db, "users");
        const docRef = doc(collectionRef, user_1);
        const docSnap = await getDoc(docRef);
        await updateDoc(docRef, {
            chatList: arrayUnion(user_2)
        })
    }
    catch (e) {
        console.error("Error adding document: ", e);
    }

    // Adding user_1 to chatList of user_2
    try{
        const collectionRef = collection(db, "users");
        const docRef = doc(collectionRef, user_2);
        const docSnap = await getDoc(docRef);
        await updateDoc(docRef, {
            chatList: arrayUnion(user_1)
        })
    }
    catch (e) {
        console.error("Error adding document: ", e);
    }


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

//comment added
export const sendChat = async (user_1, user_2, message, messageId, createdAt ) => {
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

export const getChats = async (user_1, user_2) => {
    //Creating a chat record between the two users.
    try{
        const q = query(collection(db, "chats", await chatIdOrder(user_1, user_2), "messages" ), orderBy('createdAt','desc') ,limit(50))
        //const collectionRef = collection(db, "chats", await chatIdOrder(user_1, user_2), "messages" , orderBy('timestamp', 'desc'), limit(5));
        //const docRef = doc(collectionRef,  )
        const docSnap = await getDocs(q);
        return docSnap
        docSnap.forEach((doc) => {
            // Access individual document data
            console.log(doc.id, ' => ', doc.data());
        });
    }
    catch (e) {
        console.error("Error adding document: ", e);
        
    }   
}