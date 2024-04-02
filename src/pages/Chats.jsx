//#region ----IMPORTS----
import React, { useEffect, useRef, useState } from "react";
import RecievedMsg from "../components/RecievedMsg";
import SentMsg from "../components/SentMsg";
import UserlistItem from "../components/UserlistItem";
import UserList from "../components/UserList";
import MessageRef from "./messages.json";
import { string } from "prop-types";
import { getChatsListener, getChatListListener, sendChat, getChats, getEarliestChatTimestamp, getChatsBeforeTimestamp } from "../../backend/src/functions";
import { serverTimestamp } from "firebase/firestore";
import { user_1, user_2 } from "../../backend/src/GlobalValues";
//#endregion

const Chats = () => {

  //#region ----USESTATE VARIABLES----
  const[chats,setChats]=useState(null);
  const[chatList,setChatList]=useState(null);
  const [selectedUser, setSelectedUser] = useState("")
  
  const [userScrolledUp, setUserScrolledUp] = useState(false);
  const [previousScrollHeight, setPreviousScrollHeight]  = useState(null)
  const [loadingMoreChats, setLoadingMoreChats] = useState(false);
  const [moreChatsAvailable, setMoreChatsAvailable] = useState(true);

  const chatContainerRef = useRef();
  //#endregion


  //#region ----FUNCTIONS----

      //#region ----LOAD MORE CHATS----
  const loadMoreChats = async () => {
    /*
      ->Gets the timestamp of the earliest message in session storage
        ->GETS THE TIMESTAMP OF THE EARLIEST MESSAGE IN SESSION STORAGE 
        ->RETREIVES FEW MORE DOCS FROM THE DB 
    */
    setLoadingMoreChats(true);
    //TODO: ADD A LOADING SCREEN
    const timeStamp = await getEarliestChatTimestamp(user_1, user_2)
    await getChatsBeforeTimestamp(user_1, user_2, timeStamp, (formattedData) => {
      if(Object.keys(formattedData).length === 0){
        setMoreChatsAvailable(false)
        //TODO: ADD A DIV SAYING NO MORE CHATS TO LOAD
      }
      setChats(prevState => ({...prevState,...formattedData}));
      setLoadingMoreChats(false); 
      //TODO: REMOVE THE LOADING SCREEN
    })
  } 
  //#endregion
  
      //#region ----HANDLE SCROLLING EVENTS----
  const handleScroll = async () => {
    /*
        -> CHECKS WHEN THE USER HAS SCROLLED TO TOP
    */

    const container = chatContainerRef.current;      
    
    if (container) {
      //Checks if the user has manually scrolled up (with some buffer of 100px)
      setUserScrolledUp((container.scrollHeight - (container.scrollTop + container.clientHeight)) > 100);
      
      //LOAD MORE CHATS ONLY IF:
      //1. USER HAS SCROLLED TO TOP 
      //2. CURRENTLY NO CHATS ARE BEING LOADED
      //3. THE TOTAL NUMBER OF CHATS EXCEED THE SCROLL VIEW
      //4. THERE ARE CHATS AVAILABLE IN THE DB
      if (container.scrollTop === 0 && !loadingMoreChats && container.scrollHeight > container.clientHeight
         && moreChatsAvailable) {
          setPreviousScrollHeight( container.scrollHeight );
          await loadMoreChats()
        }
    }
    
  };
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

    //sets it to false so that chats auto scroll when user sends a text at any scroll view position
    setUserScrolledUp(false)

  };
  //#endregion

  //#endregion


  //#region ----USEEFFECT - SNAPSHOT LISTENERS----
  
  // This useeffect is called once at the start of the page load
  // This listener is for the chatcards ordering
  useEffect(() => {
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
      
      // To get chats from DB or Session Storage when a chat card is first clicked
      await getChats(user_1, user_2, (formattedData) => {
        setChats(formattedData)
      })

      // Adds a onSnapShot Listener to listen to new messages
      unsubscribeFunction = await getChatsListener(user_1, selectedUser, (formattedData) => {
        setChats(prevState => ({...formattedData, ...prevState}));
      });
    };

    if(user_1 !== "" && selectedUser !== ""){
      fetchData();
      // Sets multiple variables to default values when a new chat card is clicked
      setUserScrolledUp(false)
      setLoadingMoreChats(false)
      setMoreChatsAvailable(true)
      setChatsHeight(0)
    }

    // Cleanup function to unsubscribe when component unmounts
    return () => {
        if (unsubscribeFunction) {
          setChats(null)
          unsubscribeFunction();
        }
    };
  }, [selectedUser]);

  // This useeffect is called everytime there is a change in the chats array
  // This is to position the chats in correct order and place and also load more chats as necessary
  useEffect(() => {
    const container = chatContainerRef.current;

    if (container) {

      // Load more chats if the chats displayed do not completely fill the scrollable view
      if(container.scrollHeight <= container.clientHeight){
        const loadMoreChatsAsync = async () => {await loadMoreChats()}
        loadMoreChatsAsync()
      }

      // To set the position of the scroll view after loading new chats
      if(previousScrollHeight !== null){
        const newChatsHeight = container.scrollHeight - previousScrollHeight;
        container.scrollTop += newChatsHeight;
      }

      // Scroll to the bottom on 2 conditions:
      // 1. The user has scrolled up manually and sends a text
      // 2. The user is roughly on the bottom of the screen (100 px buffer) and sends or receives a text
      if (!userScrolledUp) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [chats]);
  
  // This useeffect adds a scroll listener to the scrollable view
  // The listner handles loading chats when user scrolls to the top
  useEffect(() => {
    const container = chatContainerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [loadingMoreChats]);

  //#endregion
    

  //#region ----REACT RENDERING----
  return (

    <div className="h-[calc(100%-96px)] flex bg-amber-500" >
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
          
          <div
            ref={chatContainerRef}
            className="m-3 rounded-xl md:h-[75%] border-[1px] border-black p-2 overflow-y-auto chat-area no-scrollbar"
          >
            {/* Messages */}
            {chats && Object.entries(chats).reverse().map(([id, data]) =>
                  (data.senderId === user_1) ? 
                  (<SentMsg key={id} msg={data.message}/>) : 
                  (<RecievedMsg key={id} msg={data.message}/>)
                )}
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