
import { useState } from "react";
import {login, funcs, createChat, sendChat} from "./functions"



export default function BackendEntry(){
  

  



  const [UID, setUID] = useState('');
  const [msg, setMsg] = useState('');
  const [user_1, setUser_1] = useState('');
  const [user_2, setUser_2] = useState('');
  const [chatMsg, setChatMsg] = useState('');

  const [isSpectatorMode, setIsSpectatorMode] = useState(funcs());
  function handleClick() {
    login(UID)
      .then( () => {
        setIsSpectatorMode(funcs());
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  function getChatId(user_1, user_2){
    if(user_1>user_2) return user_2 + '+' + user_1
    else return user_1 + '+' + user_2
  }
  return (
    <div>
      <input type="text" onChange={(e)=>setUID(e.target.value)}/>
      <br />
      <button onClick={handleClick}>Click me</button>

      <p>User1</p>
      <input type="text" onChange={(e)=>setUser_1(e.target.value)}/>
      <p>User2</p>
      <input type="text" onChange={(e)=>setUser_2(e.target.value)}/>
      <button onClick={()=>{createChat(user_1, user_2)}}>CreateChat</button>
      

      
      <input type="text" onChange={(e)=>setMsg(e.target.value)}/>
      <button onClick={()=>{sendChat(getChatId(user_1, user_2), msg, user_1)}}>Send Chat</button>
      

      
    </div>
    
  )
}