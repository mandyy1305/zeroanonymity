import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { VscChromeClose } from "react-icons/vsc";
const ProfileDropdown = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  return (
    <div>
      <div className="flex relative items-center">
        <div
          className=" bg-white rounded-3xl h-10 w-20  flex justify-center items-center gap-3 "
          onClick={() => setIsProfileDropdownOpen((prevState) => !prevState)}
        ></div>
        <img
          src="https://banner2.cleanpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
          alt="I"
          className="drop rounded-full h-8 w-8 absolute left-2"
        />
        <div className="absolute right-2">
          {isProfileDropdownOpen ? <VscChromeClose /> : <IoIosArrowDown />}
        </div>
      </div>
      {isProfileDropdownOpen && (
        <div className="  w-60 px-6 py-5  absolute z-50 top-14 lg:right-10 right-2 bg-white shadow-sm flex flex-col gap-5  rounded-3xl">
          <div className="drop flex flex-col items-center justify-center">
            <img
              src="https://banner2.cleanpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
              alt="I"
              className="drop rounded-full h-14"
            />
            <span className="font-semibold text-md">GigaNiga365</span>
          </div>
          <button className="drop border-[2px] p-1 lg:pt-1 lg:pb-1.5 w-20 self-center text-sm border-red-500 text-red-500 font-semibold rounded-[10px] ">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
