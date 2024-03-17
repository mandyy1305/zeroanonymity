import { addDoc, arrayUnion, collection, doc, getDoc, query, setDoc, updateDoc } from "firebase/firestore";
import {db} from "./firebase"
import { v4 as uuidv4 } from 'uuid';

let spectatorMode = false;
export const funcs = () => {
    return spectatorMode
}
export const login = async (user) => {
    

    try {
            
        const collectionRef = collection(db, "users");
        const docID = user;
        const docRef = doc(collectionRef, docID);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            //if user exists, check for spectator mode
            if(docSnap.data().isActive){
                //user can only spectate
                spectatorMode = true;
                console.log("PartialAccess" + spectatorMode);
            }
            else{
                //user has full access
                spectatorMode = false;
                console.log("FullAccess" + spectatorMode);
            }
        }
        else{
            //create a doc in firestore if user does not already exist
            await setDoc(docRef, {
                isActive: true,
                id: uuidv4(),
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
        const messageId = new Date().toISOString();
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

export const getChatIds = async (userId) => {
    try{
        const collectionRef = collection(db, "chats");
        const chatIdList = query(collectionRef, )
    }
    catch(e){
        
    }
}