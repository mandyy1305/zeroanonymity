import React from "react";
import UserlistItem from "./UserlistItem";
const UserList = () => {
  return (
    <div className="bg-sky-100 border-[2px] border-black w-full ml-[2px] lg:ml-0 lg:w-1/3 p-2 flex flex-col 
      gap-1 overflow-auto no-scrollbar " >
        <UserlistItem username="divyansh"/>
        <UserlistItem username="priyanka"/>
      </div>
  );
};
export default UserList;
