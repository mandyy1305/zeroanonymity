import { useState } from "react";
import { setUser_2 } from "../../backend/src/GlobalValues";

const UserlistItem = (props) => {
    // const[user_2,setUser_2]=useState(null);
    return (
        <div className="bg-blue-300 border-[1px] border-gray-600 flex rounded-lg items-center pl-2 py-3 " onClick={()=>(setUser_2(props.username))}>
        <img
            src="https://banner2.cleanpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
            alt="I"
            className="rounded-full h-8 w-8 bg-green-900"
          />
          <span className="ml-4 text-lg  font-bold text-black">{props.username}</span>
        </div>
    );
  };
  
  export default UserlistItem;