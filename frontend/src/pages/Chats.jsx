import React, { useEffect, useRef } from "react";
import RecievedMsg from "../components/RecievedMsg";
import SentMsg from "../components/SentMsg";

const Chats = () => {
  return (
    <div className="bg-red-400 h-[calc(100%-96px)] flex">
      <div className="bg-white border-[2px] border-black w-full ml-[2px] lg:ml-0 lg:w-1/3 ">
        userlist
      </div>
      <div className="bg-sky-100 w-1 invisible lg:visible lg:w-3/4">
        <div className="bg-[#299595] h-[45px] flex items-center pl-4 border-t-[2px] border-b-[2px] border-black">
          <img
            src="https://banner2.cleanpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
            alt="I"
            className="rounded-full h-8 w-8"
          />
          <span className="ml-4 text-lg font-semibold text-white">Someone</span>
        </div>
        <div className="bg-sky-100 h-5/6 flex flex-col">
          <div
            className="m-3 rounded-xl bg-white h-5/6 border-[1px] border-black p-2 flex flex-col
                    overflow-y-auto chat-area"
          >
            <RecievedMsg msg="hii 1" />
            <SentMsg msg="hello" />
            <RecievedMsg msg="hii" />
            <SentMsg msg="hello" />
            <RecievedMsg msg="hii" />
            <SentMsg msg="hello" />
            <RecievedMsg msg="hii" />
            <SentMsg msg="hello" />
            <RecievedMsg msg="hii" />
            <SentMsg msg="hello" />
            <RecievedMsg msg="hii" />
            <SentMsg msg="hello" />
            <RecievedMsg msg="hii" />
            <SentMsg msg="hello" />
            <RecievedMsg msg="hii" />
            <SentMsg msg="hello" />
            <RecievedMsg msg="hii" />
            <SentMsg msg="hello" />
            <RecievedMsg msg="hii" />
            <SentMsg msg="hello" />
            <RecievedMsg msg="hii" />
            <SentMsg msg="hello" />
            <RecievedMsg msg="hii" />
            <SentMsg msg="hello" />
            <RecievedMsg msg="hii" />
            <SentMsg msg="hello" />
            <RecievedMsg msg="hii" />
            <SentMsg msg="hello" />
            <RecievedMsg msg="hii" />
            <SentMsg msg="hello" />
            <RecievedMsg msg="hii" />
            <SentMsg msg="hello 2" />
          </div>
          <div className="bg-sky-100 h-1/6 pl-3 flex ">
            <input
              type="text"
              className="w-11/12 h-[35px] rounded-lg p-4 text-sm border-[1px] border-black"
              placeholder="Message"
            />
            <div className="flex justify-center items-center bg-gray-600 w-[35px] h-[35px]  ml-4 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
