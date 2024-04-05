import React, { useEffect, useState } from "react";
import UserlistItem from "./UserlistItem";
import { setUser_2, user_1 } from "../../backend/src/GlobalValues";
import {motion, useAnimate, useAnimation} from "framer-motion"

import { createChat } from "../../backend/src/functions";
import { query } from "firebase/firestore";


const UserList = ({chatCardList, updateSelectedUserFunc}) => {
  
  const [serachPanelVisiblity,setSearchPanelVisiblity] = useState(false);
  const [newUsername, setNewUsername] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredArray, setFilteredArray] = useState(null);
  const addNewChatControls = useAnimation()
  const chatCardControls = useAnimation()
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
    if(serachPanelVisiblity){
      addNewChatControls.set({scaleY:0, originY: 0});
      addNewChatControls.start({scaleY:1, transition:{type: "stiff", ease: "easeInOut", duration: 0.3}})
      chatCardControls.set({y: -240})
      chatCardControls.start({y:0, transition:{type: "stiff", ease: "easeInOut", duration: 0.3}})
    }
    else{
      addNewChatControls.start({scaleY:0, transition:{type: "stiff", ease: "easeInOut", duration: 0.3}})
      chatCardControls.start({y:-240, transition:{type: "stiff", ease: "easeInOut", duration: 0.3}})
    }
  }, [serachPanelVisiblity])

  useEffect(()=>{
    setFilteredArray(chatCardList)
  }, [chatCardList])

  useEffect(()=> {
    setFilteredArray(chatCardList.filter(item => item.includes(searchQuery)));
  }, [searchQuery])
  
  // if(chatCardList){
  //   console.log("not empty")
  // }else{
  //   console.log("empty")
  // }
  return (
    <div className="bg-white rounded-t-xl  w-full ml-[2px] lg:ml-0 lg:w-1/3 p-2 flex flex-col gap-1 overflow-auto no-scrollbar shadow-gray-900 shadow-2xl h-[105%]">
      <p className="text-black align-middle text-center  text-2xl mt-3 font-semibold">Recent Chats</p>
        <div className=" flex justify-evenly gap-1 px-1 mt-6">
          { <input type="text" className="bg-[#00000000] border-[1px] border-gray-500 h-12 w-2/3 rounded-xl pl-2" placeholder="Search"
          onChange={(e)=>setSearchQuery(e.target.value)}
          />}
          <button className="bg-[#006ea7] h-12 w-1/3 rounded-b-xl rounded-tl-xl font-semibold text-white" onClick={()=>{setSearchPanelVisiblity(!serachPanelVisiblity); onAnimate()}}>+Start a new chat</button>
          {/* {console.log(serachPanelVisiblity)} */}
        </div>
        {
          //TODO: div initially animates to 0. gotta prevent that
          //serachPanelVisiblity && 
        <motion.div 
        className=" flex flex-col py-10 px-4 border-[1px] border-gray-500 rounded-2xl mx-1 my-1"
          animate={addNewChatControls}
        >
          <p className=" text-lg font-semibold ml-8">Start a new chat :</p>
          <input type="text" className="bg-[#00000000] border-[2px] border-gray-500 h-12 w-5/6   rounded-xl pl-2 mx-auto mb-5 mt-1" placeholder="Enter Username" 
            onChange={(e)=>setNewUsername(e.target.value)}
          />
          <button className="bg-[#00000000] border-[2px] border-blue-800 w-1/3 h-12 rounded-lg mx-auto" 
            onClick={checkChatExistence}
          >Begin Chat</button>
        </motion.div>
        
        }

        <motion.div animate={chatCardControls}>
          { 
            (filteredArray !== null ? filteredArray : chatCardList).map((item) => {
              const username = item;
              return <UserlistItem username={username} updateSelectedUserFunc = {updateSelectedUserFunc}/>;
            })
          }
        </motion.div>
    </div>
  );
};
export default UserList;
