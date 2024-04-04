import React, { useEffect, useState } from "react";
import UserlistItem from "./UserlistItem";
import { setUser_2, user_1 } from "../../backend/src/GlobalValues";
import {motion, useAnimate} from "framer-motion"

import { createChat } from "../../backend/src/functions";
import { query } from "firebase/firestore";


const UserList = ({chatCardList, updateSelectedUserFunc}) => {
  
  const [serachPanelVisiblity,setSearchPanelVisiblity] = useState(false);
  const [newUsername, setNewUsername] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredArray, setFilteredArray] = useState(null);

  // Checks if a chat in db exists between the users
  const checkChatExistence = async () => {
    if(chatCardList.includes(newUsername)){
      // Chat Exists, just open that chat
      console.log("Yems", chatCardList)
      await setUser_2(newUsername);
      updateSelectedUserFunc(newUsername)
    }
    else{
      console.log("No", chatCardList)
      await createChat(user_1, newUsername);
      await setUser_2(newUsername);
      updateSelectedUserFunc(newUsername)
    }
  }

  useEffect(()=>{
    setFilteredArray(chatCardList)
  }, [chatCardList])

  useEffect(()=> {
    setFilteredArray(chatCardList.filter(item => item.includes(searchQuery)));
  }, [searchQuery])
  

  return (
    <div className="bg-white rounded-t-lg w-full ml-[2px] lg:ml-0 lg:w-1/3 p-2 flex flex-col gap-1 overflow-auto no-scrollbar shadow-black shadow-2xl">
      <p className="text-black align-middle text-center  text-2xl mt-3 font-semibold">Recent Chats</p>
        <div className=" flex justify-evenly gap-1 px-1 mt-6">
          <input type="text" className="bg-[#00000000] border-[1px] border-gray-500 h-12 w-2/3 rounded-xl pl-2" placeholder="Search"
          onChange={(e)=>setSearchQuery(e.target.value)}
          />
          <button className="bg-[#006ea7] h-12 w-1/3 rounded-b-xl rounded-tl-xl font-semibold text-white" onClick={()=>{setSearchPanelVisiblity(!serachPanelVisiblity)}}>+Start a new chat</button>
          {/* {console.log(serachPanelVisiblity)} */}
        </div>
        {serachPanelVisiblity
         && 

        <div className=" flex flex-col py-10 px-4 border-[1px] border-gray-500 rounded-2xl mx-1 my-1">
          <p className=" text-lg font-semibold ml-8">Start a new chat :</p>
          <input type="text" className="bg-[#00000000] border-[2px] border-gray-500 h-12 w-5/6   rounded-xl pl-2 mx-auto mb-5 mt-1" placeholder="Enter Username" 
            onChange={(e)=>setNewUsername(e.target.value)}
          />
          <button className="bg-[#00000000] border-[2px] border-blue-800 w-1/3 h-12 rounded-lg mx-auto" 
            onClick={checkChatExistence}
          >Begin Chat</button>
        </div>
        
        }
      { 
        (filteredArray !== null ? filteredArray : chatCardList).map((item) => {
          const username = item;
          return <UserlistItem username={username} updateSelectedUserFunc = {updateSelectedUserFunc}/>;
        })
      }
    </div>
  );
};
export default UserList;
