import { useState } from "react";
import { setUser_2 } from "../../backend/src/GlobalValues";

const UserlistItem = ({username, updateSelectedUserFunc}) => {
    
    const handleClick = async () => {
      await setUser_2(username);
      updateSelectedUserFunc(username);
    }
  
    return (
        <div className=" border-[1px] border-gray-600 flex rounded-bl-[30px] rounded-tr-[30px] rounded-tl-xl rounded-br-xl  items-center pl-8 py-3 my-[1px]" onMouseEnter={handleClick}>
        <img
            src="https://banner2.cleanpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
            alt="I"
            className="rounded-full h-12 w-12 bg-green-900"
          />
          <span className="ml-4 text-lg  font-bold text-black">{username}</span>
        </div>
    );
  };
  
  export default UserlistItem;