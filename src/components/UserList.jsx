import React, { useState } from "react";
import UserlistItem from "./UserlistItem";
const UserList = ({chatCardList, updateSelectedUserFunc}) => {
  const [serachPanelVisiblity,setSearchPanelVisiblity] = useState(false);
  return (
    <div className="bg-white rounded-t-lg w-full ml-[2px] lg:ml-0 lg:w-1/3 p-2 flex flex-col gap-1 overflow-auto no-scrollbar shadow-black shadow-2xl">
      <p className="text-black align-middle text-center  text-2xl mt-3 font-semibold">Recent Chats</p>
        <div className=" flex justify-evenly gap-1 px-1 mt-6">
          <input type="text" className="bg-[#00000000] border-[1px] border-gray-500 h-12 w-2/3 rounded-xl pl-2" placeholder="Search"/>
          <button className="bg-[#006ea7] h-12 w-1/3 rounded-b-xl rounded-tl-xl font-semibold text-white" onClick={()=>(setSearchPanelVisiblity(!serachPanelVisiblity))}>+ Add new chats</button>
        </div>
        {serachPanelVisiblity
         && 
        <div className=" flex flex-col py-10 px-4 border-[1px] border-gray-500 rounded-2xl mx-1 my-1">
          <p className=" text-lg font-semibold ml-8">Start a new chat :</p>
          <input type="text" className="bg-[#00000000] border-[2px] border-gray-500 h-12 w-5/6   rounded-xl pl-2 mx-auto mb-5 mt-1" placeholder="Enter Username" />
          <button className="bg-[#00000000] border-[2px] border-blue-800 w-1/3 h-12 rounded-lg mx-auto">Begin Chat</button>
        </div>}
      { 
        chatCardList.map((item) => {
          const username = item;
          return <UserlistItem username={username} updateSelectedUserFunc = {updateSelectedUserFunc}/>;
        })
      }
    </div>
  );
};
export default UserList;
