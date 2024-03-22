import { Firestore, addDoc, arrayUnion, collection, doc, getDoc, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import {db} from "./firebase"
import { startHeartbeat } from "./HeartBeatSignal";

export let heartBeatId;
let spectatorMode = true;
export const funcs = () => {
    return spectatorMode
}

export const locatlDate = (utcTime) => {
    const date = new Date(utcTime)
    const localDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    return localDate.toISOString();
}

export const login = async (user_id) => {
    
    try {
        
        const collectionRef = collection(db, "users");
        const docID = user_id;
        const docRef = doc(collectionRef, docID);
        const docSnap = await getDoc(docRef);

        const userFullAccess = async () => {
            // function to give full access to user while log in
            spectatorMode = false;
            await updateDoc(docRef, {
                lastActive: new Date().toISOString()
            })

            //start heartbeat signals upon successful login
            heartBeatId = startHeartbeat(user_id);

            console.log("FullAccess" + spectatorMode);
        }
        const userPartialAccess = async () => {
            // function to give partial access to user while log in
            spectatorMode = true;
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
                if(timeDiff > 0.2){
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

export const createChat = async (user_1, user_2) => {
    const chatIdOrder = async () =>{ 
        if(user_1>user_2){
            [user_1, user_2] = [user_2, user_1];
        }
        return user_1 + '+' + user_2;
    }

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
        const docRef = doc(collectionRef, await chatIdOrder() )
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


export const sendChat = async (chatId, message, senderId) => {
    try{
        const messageId = new Date().toISOString() + "+" + senderId;
        const collectionRef = collection(db, 'chats', chatId, 'messages');
        const docRef = doc(collectionRef, messageId);

        const docSnap = await setDoc(docRef, {
            message: message,
            senderId: senderId
        });
        console.log("Document written with ID: ", docRef.id);
    }
    catch(e){
        console.error("Error adding document: ", e);
    }
}