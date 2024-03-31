import React, { useEffect, useRef, useState } from "react";
import RecievedMsg from "../components/RecievedMsg";
import SentMsg from "../components/SentMsg";
import UserlistItem from "../components/UserlistItem";
import UserList from "../components/UserList";
import MessageRef from "./messages.json";
import { string } from "prop-types";
import { getChats, getSortedChatList, sendChat } from "../../backend/src/functions";
import { serverTimestamp } from "firebase/firestore";
import { user_1, user_2 } from "../../backend/src/GlobalValues";


const Chats = () => {
    // const chatEndRef = useRef(null);
    console.log(user_2)
    console.log(user_1)

  // let msgs = JSON.parse(MessageRef)
  // msgs.forEach(msg => {
  //   console.log(msg);
  // });

  const [chatUser, setChatUser] = useState(null);
  const[chats,setChats]=useState(null);
  const[chatList,setChatList]=useState(null);
  // var user_1="divyansh";
  // var user_2="priyanka";
  
  const fetchData = async () => {
    try {
      // Call the getChats function and pass the necessary parameters
      if(user_1!="" && user_2!=""){
      const docSnap = await getChats(user_1, user_2); // Provide appropriate user_1 and user_2 values
      // Extract the JSON object from docSnap and set it to state
      const formattedData = docSnap.docs.reduce((acc, doc) => {
        acc[doc.id] = doc.data();
        return acc;
      }, {});
      
      // Set the transformed data to state
      setChats(formattedData);}
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  }

  useEffect(() => {
    const fetchChatList = async() => {
      setChatList(await getSortedChatList(user_1));
    }
    fetchData()
    fetchChatList()
    // if(chatEndRef.current){
    //   chatEndRef.current.scrollIntoView();
    // }
  }, [])
  
  const sendMsg = (msgSnapshot) => {
    const msgText = document.getElementById("messageInput").value;
    document.getElementById("messageInput").setAttribute("");
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

  return (
    <div className="h-[calc(100%-96px)] flex bg-amber-500">
      {chatList !== null &&<UserList chatCardList = {chatList} fetchDataFunc = {fetchData}/>}
      <div className="bg-sky-00 w-1 invisible lg:visible lg:w-3/4">
        <div className="bg-[#299595] h-[45px] flex items-center pl-4 border-t-[2px] border-b-[2px] border-black">
          <img
            src="https://banner2.cleanpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
            alt="I"
            className="rounded-full h-8 w-8"
          />
          <span className="ml-4 text-lg font-semibold text-white">{user_2}</span>
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
};

export default Chats;




