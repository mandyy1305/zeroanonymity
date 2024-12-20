import React, { useEffect, useState } from "react";
import UserlistItem from "./UserlistItem";
import { setChameleon, setUser_2, spectatorMode, user_1 } from "../../backend/src/GlobalValues";
import {motion, useAnimate, useAnimation} from "framer-motion"

import { createChat } from "../../backend/src/functions";
import { query } from "firebase/firestore";
import { useOutlet, useOutletContext } from "react-router-dom";



const UserList = ({chatCardList, updateSelectedUserFunc, startAnimation}) => {
  
  const [serachPanelVisiblity,setSearchPanelVisiblity] = useState(false);
  const [newUsername, setNewUsername] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredArray, setFilteredArray] = useState(null);
  const [reRender, setReRender] = useState(false)
  
  const[usernamePerm,setUsernamePerm]=useState(false);
  const regex = /^[a-z_]*$/;
  
  const addNewChatControls = useAnimation()
  const chatCardControls = useAnimation()
  const newButton = useAnimation()
  const findAChat = useAnimation()
  
  const context = useOutletContext()

  // Checks if a chat in db exists between the users
  const checkChatExistence = async () => {
    if(!chatCardList.includes(newUsername)){
      usernamePerm && await createChat(user_1, newUsername);
    }
    usernamePerm && await setUser_2(newUsername);
    usernamePerm && updateSelectedUserFunc(newUsername)
    startAnimation();
    setChameleon(true);
    setReRender(!reRender)
  }


  useEffect(()=>{
    addNewChatControls.set({scaleY:0, originY: 0});
  }, [])


  useEffect(()=>{
    if(serachPanelVisiblity){
      console.log("Chat is", getChatExists(), sessionStorage.getItem("ChatExists"))
      if(getChatExists()){
        addNewChatControls.set({scaleY:0, originY: 0, y:0});
        addNewChatControls.start({scaleY:1, transition:{type: "stiff", ease: "easeInOut", duration: 0.3}})
      }
      else{
        addNewChatControls.set({scaleY:0, originY: 0, y: -150});
        addNewChatControls.start({scaleY:1, transition:{type: "stiff", ease: "easeInOut", duration: 0.3, delay: 0.3}})
      }
      chatCardControls.set({y: -240})
      chatCardControls.start({y:0, transition:{type: "stiff", ease: "easeInOut", duration: 0.3}})
      newButton.set({y: 0, x:0})
      newButton.start({y:-150, x: 0, transition:{type: "stiff", ease: "easeInOut", duration: 0.3}})
      findAChat.set({y: 0, x:0})
      findAChat.start({y:-150, x: 0, transition:{type: "stiff", ease: "easeInOut", duration: 0.3}})
    }
    else{
      addNewChatControls.start({scaleY:0, transition:{type: "stiff", ease: "easeInOut", duration: 0.3}})
      chatCardControls.start({y:-240, transition:{type: "stiff", ease: "easeInOut", duration: 0.3}})
      newButton.start({y:0, x: 0, transition:{type: "stiff", ease: "easeInOut", duration: 0.3, delay: 0.3}})
      findAChat.start({y:0, x: 0, transition:{type: "stiff", ease: "easeInOut", duration: 0.3, delay: 0.3}})
    }
  }, [serachPanelVisiblity])

  useEffect(()=>{

    setFilteredArray(chatCardList)
    if(chatCardList.length === 0) setChatExists(false)
    else setChatExists(true)
    console.log(chatCardList)
  }, [chatCardList])

  useEffect(()=> {
    setFilteredArray(chatCardList.filter(item => item.includes(searchQuery)));
  }, [searchQuery])

  useEffect(()=>{
    if(regex.test(newUsername))
  { 
    if(newUsername!==""){
    setUsernamePerm(true);
    console.log("allowed")}
    else{
      setUsernamePerm(false);
      console.log("not allowed")
    }
  }else{
    setUsernamePerm(false);
    console.log("not allowed")
  }
  },[newUsername])
  

  const getChatExists = () => {return sessionStorage.getItem('ChatExists') === 'true'}
  const setChatExists = (value) => {sessionStorage.setItem('ChatExists', value)}

  useEffect(() => {
    setReRender(!reRender)
  }, [context.darkMode, chatCardList]);

  return (
          
    <div 
    className="bg-white  dark:bg-[#212121] rounded-t-xl w-full ml-[2px] lg:ml-0 lg:w-1/3 p-2 flex flex-col gap-1 overflow-auto no-scrollbar shadow-gray-900 shadow-2xl h-[110%]">
      {getChatExists() && <p 
      className="text-black dark:text-white align-middle text-center text-2xl font-semibold pb-2">Recent Chats</p>}      
      <div className={` flex flex-col gap-2 ${!getChatExists() && 'mt-[65%]'}`}>
        {!getChatExists() && 
        (!spectatorMode 
          ?
            <motion.p animate={findAChat} className="text-lg dark:text-white mx-auto font-semibold">Find a chat to get started</motion.p>
          :
            <p className="text-lg dark:text-white mx-auto font-semibold">No chats available!</p>

        )
        }
        <div className={"flex justify-evenly gap-1 px-1 mb-2"}>
          
          {getChatExists() &&           
            (spectatorMode ? 
            
              <input type="text" className="bg-[#00000000] border-[1px] border-gray-500 dark:border-white h-12 w-11/12 rounded-xl pl-2" placeholder="Search"
              onChange={(e)=>setSearchQuery(e.target.value)} id="newChatUsername"
              />:
              
              <input type="text" className="bg-[#00000000] border-[1px] border-gray-500 dark:border-white h-12 w-2/3 rounded-xl pl-2" placeholder="Search"
              onChange={(e)=>setSearchQuery(e.target.value)} id="newChatUsername"
              />
            )
          }  

          {getChatExists() ? 
          
          !spectatorMode && <button className="bg-[#006EA7] dark:bg-[#212121] dark:text-[#BF97FF] h-12 w-1/3 text-sm border-white border-[1.3px] rounded-b-xl rounded-tl-xl font-semibold text-white" onClick={()=>{setSearchPanelVisiblity(!serachPanelVisiblity);}}>
            + Start new chat
          </button> : 
          
          !spectatorMode && <motion.button 
          animate={newButton}
          className="bg-white h-[44px] w-1/3 rounded-xl border-[2px] px-2 text-sm border-[#006EA7] dark:bg-[#212121] dark:border-white dark:text-[#BF97FF] font-semibold text-[#006EA7] mt-2" onClick={()=>{setSearchPanelVisiblity(!serachPanelVisiblity);}}>
            + Start new chat
          </motion.button>}

          {/* {console.log(serachPanelVisiblity)} */}
        </div>
        </div>
        {
          //TODO: div initially animates to 0. gotta prevent that
          //serachPanelVisiblity && 
        <motion.div 
        className=" flex flex-col py-10 px-4 border-[1px] border-gray-500 dark:border-white rounded-2xl mx-1 my-1"
          animate={addNewChatControls}
        >
          <p className=" text-lg dark:text-white font-semibold ml-8">Start a new chat :</p>
          <input maxLength="20" type="text" className="bg-[#00000000] border-[2px] border-gray-500 dark:border-white h-12 w-5/6  dark:text-white rounded-xl pl-2 mx-auto mb-2 mt-1 focus:outline-black dark:focus:outline-white" placeholder="Enter Username" 
            onChange={(e)=>setNewUsername(e.target.value)}
          />
          {newUsername !=="" && !usernamePerm && <p className="bg-[#00000000] mt-2 text-sm text-red-700 mb-5 mx-auto">*You can only use lowercase alphabets and underscore(_)</p>}
          <button className=" dark:bg-[#BF97FF] font-medium border-[2px] text-[#006EA7] dark:text-black dark:border-[#BF97FF] border-[#006EA7] w-1/3 h-12 rounded-lg mx-auto" 
            onClick={() => {
              checkChatExistence();
              addNewChatControls.set({scaleY:0}) 
              setSearchPanelVisiblity(!serachPanelVisiblity)
            }}
          >Begin Chat</button>
        </motion.div>
        
        }

        <motion.div animate={chatCardControls}>
          { 
            (filteredArray !== null ? filteredArray : chatCardList).map((item) => {
              const username = item;
              return <UserlistItem username={username} updateSelectedUserFunc = {updateSelectedUserFunc} startAnimation={startAnimation} setReRender={setReRender}  reRender={reRender} darkMode={context.darkMode}/>;
            })
          }
        </motion.div>
    </div>
  );
};
export default UserList;
