
import { useEffect, useState } from "react";
import {login, createChat, sendChat, heartBeatId, getChats, getSortedChatList, logout, getChatListListener, getChatsListener} from "./functions"
import "./functions"
import { stopHeartbeat } from "./HeartBeatSignal";
import { serverTimestamp } from "firebase/firestore";
import { spectatorMode } from "./GlobalValues";


export default function BackendEntry(){


  // useEffect( ()=>{
  //   funcs();
  // })

  const hello = "shubham"

  const [UID, setUID] = useState('');
  const [msg, setMsg] = useState('');
  const [user_1, setUser_1] = useState('');
  const [user_2, setUser_2] = useState('');
  const [chatMsg, setChatMsg] = useState('');
  const [subscribedUser, setSubscribedUser] = useState('');

  const [isSpectatorMode, setIsSpectatorMode] = useState(spectatorMode);

  function handleClick() {
    login(UID)
      .then( () => {
        setIsSpectatorMode(spectatorMode);
        //start heartbeat

      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  function getChatId(user_1, user_2){
    if(user_1>user_2) return user_2 + '+' + user_1
    else return user_1 + '+' + user_2
  }




const handleClickk = async () => {
  setSubscribedUser(user_2)  
}

  return (
    <div>
      <input className="border-[2px] border-black" type="text" onChange={(e)=>setUID(e.target.value)}/>
      <br />
      <button onClick={handleClick}>login</button>

      <p>User1</p>
      <input className="border-2 border-black" type="text" onChange={(e)=>setUser_1(e.target.value)}/>
      <p>User2</p>
      <input type="text" onChange={(e)=>setUser_2(e.target.value)}/>
      <button className="border-[2px] border-black" onClick={()=>{createChat(user_1, user_2)}}>CreateChat</button>
      
      <input type="text" onChange={(e)=>setMsg(e.target.value)}/>
      <button className="bg-red-900s" onClick={()=>{sendChat(user_1, user_2, msg, new Date().toISOString() + '+' +user_1, serverTimestamp())}}>Send Chat</button>
      <br /><br />
      <button onClick={() => {setIsSpectatorMode(!isSpectatorMode)}}>Click me</button>
      <p>Hello, {isSpectatorMode ? "Not yet logged in" : "Logged in"}</p>

      <br /><br />
      <button className="border-[2px] border-black bg-red-500" onClick={()=>{stopHeartbeat(heartBeatId)}}>Stop HeartBeat</button>
      
      <br /><br />
      <button className="border-[2px] border-black bg-red-500" onClick={handleClickk}>set chat name</button>

      <br /><br />
      <button className="border-[2px] border-black bg-red-500" onClick={()=>{logout(user_1)}}>Logout</button>

      <br /><br />
      <button className="border-[2px] border-black bg-red-500" onClick={()=>{getSortedChatList(user_1)}}>Get Sorted List Time</button>
      
    </div>
    
  )
}