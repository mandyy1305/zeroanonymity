import React from "react";
import UserlistItem from "./UserlistItem";
const UserList = ({chatCardList, fetchDataFunc}) => {

  return (
    // <div className="bg-sky-100 border-[2px] border-black w-full ml-[2px] lg:ml-0 lg:w-1/3 p-2 flex flex-col 
    //   gap-1 overflow-auto no-scrollbar " >
    //     <UserlistItem username="manish"/>
    //     <UserlistItem username="divyansh"/>
    //   </div>

    <div className="bg-sky-100 border-[2px] border-black w-full ml-[2px] lg:ml-0 lg:w-1/3 p-2 flex flex-col gap-1 overflow-auto no-scrollbar">
      {
        
        chatCardList.map((item, index) => {
          // Extract timestamp and username from each item object
          const timestamp = Object.keys(item)[0];
          const username = item[timestamp];

          // Render   UserlistItem with username
          return <UserlistItem key={index} username={username} fetchDataFunc = {fetchDataFunc}/>;
        })
      }
    </div>
  );
};
export default UserList;
