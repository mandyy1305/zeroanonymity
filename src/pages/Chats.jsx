//#region ----IMPORTS----
import React, { useEffect, useRef, useState } from "react";
import RecievedMsg from "../components/RecievedMsg";
import SentMsg from "../components/SentMsg";
import UserlistItem from "../components/UserlistItem";
import UserList from "../components/UserList";
import MessageRef from "./messages.json";
import { string } from "prop-types";
import { getChatsListener, getChatListListener, sendChat } from "../../backend/src/functions";
import { serverTimestamp } from "firebase/firestore";
import { user_1, user_2 } from "../../backend/src/GlobalValues";
//#endregion

const Chats = () => {

  //#region ----Pata nahi kuch toh kis hai chhotu----
  const chatEndRef = useRef(null);
  // let msgs = JSON.parse(MessageRef)
  // msgs.forEach(msg => {
  //   console.log(msg);
  // });
  //#endregion

  //#region ----USESTATE VARIABLES----
  const[chats,setChats]=useState(null);
  const[chatList,setChatList]=useState(null);
  const [selectedUser, setSelectedUser] = useState("")
  //#endregion

  //#region ----SNAPSHOT LISTENERS - USEEFFECTS----
  // this useeffect is called once at the start of the page load
  // this listener is for the chatcards ordering
  useEffect(() => {
    if(chatEndRef.current){
      chatEndRef.current.scrollIntoView();
    }
    const unsubscribe = getChatListListener(user_1, (snapshotArray) => {
      setChatList(snapshotArray)
    });
    return () => {
      unsubscribe();
    };
  }, [])

  
  //this useeffect is called every time the user clicks on a chat card
  // this listener is for when the user clicks on a chat card and listens for new chats
  useEffect(() => {
    let unsubscribeFunction;

    const fetchData = async () => {
        unsubscribeFunction = await getChatsListener(user_1, selectedUser, (formattedData) => {
          console.log("New mesasge sent/received")
          setChats(formattedData)
        });
    };
    //check this also properly
    if(user_1 !== "" && selectedUser !== ""){
      fetchData();
    }
    // Cleanup function to unsubscribe when component unmounts
    return () => {
        if (unsubscribeFunction) {
            unsubscribeFunction();
        }
    };
  }, [selectedUser]);
  //#endregion
  
  //#region ----SEND MESSAGE-----
  const sendMsg = (msgSnapshot) => {
    const msgText = document.getElementById("messageInput").value;
    document.getElementById("messageInput").value = '';
    const newID = new Date().toISOString() + '+' +user_1
    const createdAt = serverTimestamp()
    const newEntry = {
      [newID]: { // Use a unique key for the new entry
        "senderId": user_1,
        "message": msgText,
        "createdAt": createdAt
      }
    };

    sendChat(user_1, user_2, msgText, newID, createdAt);
    // Update state
    setChats({...newEntry ,...chats});

  };
  //#endregion
  
  //#region ----REACT RENDERING----
  return (

    <div className="h-[calc(100%-96px)] flex bg-amber-500">
      {chatList !== null &&<UserList chatCardList = {chatList} updateSelectedUserFunc = {setSelectedUser}/>}
      <div className="bg-sky-00 w-1 invisible lg:visible lg:w-3/4">
        <div className="bg-[#299595] h-[45px] flex items-center pl-4 border-t-[2px] border-b-[2px] border-black">
          <img
            src="https://banner2.cleanpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
            alt="I"
            className="rounded-full h-8 w-8"
          />
          <span className="ml-4 text-lg font-semibold text-white">Someone</span>
        </div>
        <div className="bg-sky-100 flex h-[105%] flex-col ">
          <div className="m-3 rounded-xl md:h-[75%]  border-[1px] border-black p-2 flex flex-col overflow-y-auto chat-area no-scrollbar">
            {/* Message */}

            {chats && Object.entries(chats).reverse().map(([id, data]) => (
              data.senderId === user_1 ? 
                (<SentMsg key={id} msg={data.message}/>) :
                (<RecievedMsg key={id} msg={data.message}/>)
                
            ))}
              
            {/* <div ref={chatEndRef}></div> */}
          
          </div>
          <div className="bg-[#00000000] h-1/6 pl-3 flex ">
            <input
              id="messageInput"
              type="text"
              className="w-11/12 h-[35px] rounded-lg p-4 text-sm border-[1px] border-black"
              placeholder="Message"
            />
            <div className="flex justify-center items-center bg-gray-600 w-[35px] h-[35px]  ml-4 rounded-full" 
            onClick={sendMsg}></div>
          </div>
        </div>
      </div>
    </div>
  );
  //#endregion

};

export default Chats;




