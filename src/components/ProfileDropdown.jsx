import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { VscChromeClose } from "react-icons/vsc";
const ProfileDropdown = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  return (
    <div>
      <div
        className=" bg-white rounded-3xl h-10 w-[90px] px-2 abs  flex justify-center items-center gap-3 "
        onClick={() => setIsProfileDropdownOpen((prevState) => !prevState)}
      >
        <img
          src="https://banner2.cleanpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
          alt="I"
          className="drop rounded-full h-8 w-8"
        />
        {isProfileDropdownOpen ? <VscChromeClose /> : <IoIosArrowDown />}
      </div>
      {isProfileDropdownOpen && (
        <div className="  w-60 px-6 py-5  absolute z-50 top-14 lg:right-10 right-2 bg-white shadow-sm flex flex-col gap-3  rounded-3xl">
          <span className="drop text-xs">You are logged in as</span>
          <div className="drop flex items-center justify-center gap-4">
            <img
              src="https://banner2.cleanpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
              alt="I"
              className="drop rounded-full h-8"
            />
            <span className="font-semibold text-md ">GigaNiga365</span>
          </div>
          <hr />
          <button className="drop border-[1px] p-1 lg:pt-1 lg:pb-1.5 w-20 self-center text-sm border-red-500 text-red-500 font-semibold rounded-[10px] ">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
