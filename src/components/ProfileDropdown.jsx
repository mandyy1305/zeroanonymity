import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { setChameleon, setSpectatorMode, setUserSelected, setUser_1, setUser_2, spectatorMode, user_1 } from "../../backend/src/GlobalValues";
import { useNavigate, useOutletContext } from "react-router-dom";
import { logout } from "../../backend/src/functions";


const ProfileDropdown = ({darkMode, setIsLoggedIn}) => {
  const backgroundControls = useAnimation()
  const avatarControls = useAnimation()
  const usernameControls = useAnimation()
  const logoutControls = useAnimation()
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navigate = useNavigate()

  
  useEffect(() => {
    if(isProfileDropdownOpen){
      
      backgroundControls.start({width:240 ,height: 148,scaleY: 1,y:51,originY:0,transition:{type: "stiff", ease: "easeInOut", duration: 0.3}})
      avatarControls.start({y:70, x:97 , scale: 1.7,transition:{type: "stiff", ease: "easeInOut", duration: 0.3}})
      
      usernameControls.set({y:7, x:47})
      logoutControls.set({y:47, x:-37})
      
      setTimeout(() => {
        usernameControls.start({ opacity:1 ,transition:{type: "stiff", ease: "easeInOut", duration: 0.3}})
        logoutControls.start({ opacity:1, transition:{type: "stiff", ease: "easeInOut", duration: 0.3}})
      }, 200);
    }

    else{
      backgroundControls.start({width:68 ,height: 40,y:0,originY:0,transition:{type: "stiff", ease: "easeInOut", duration: 0.3}})
      avatarControls.start({y:0, x:0 , scale: 1,transition:{type: "stiff", ease: "easeInOut", duration: 0.3}})
    }
  }, [isProfileDropdownOpen])

  return (
      //TODO: relative ko flex karna hai bina pos chode 
      <div className=" flex absolute right-12 items-center z-[60] ">
        <motion.div
          animate={backgroundControls}
          className=" bg-white dark:bg-slate-950 rounded-3xl h-10 w-[4.25rem]  flex justify-center items-center gap-3 border-[1.8px] border-gray-300 dark:border-none"
          onClick={() => {setIsProfileDropdownOpen((prevState) => !prevState);}}
          
        >
            {isProfileDropdownOpen && <motion.span animate={usernameControls} className="font-semibold text-black dark:text-white text-md opacity-0">{user_1}</motion.span>}
            {isProfileDropdownOpen && 
            (!spectatorMode ? 
              <motion.button 
                animate={logoutControls} 
                onClick={async () => {
                  if(user_1 !== ""){
                    await logout(user_1);
                    setIsLoggedIn(false)
                    setSpectatorMode(false)
                    setUser_1("")
                    setUser_2("")
                    setUserSelected(false)
                    setChameleon(false)
                    sessionStorage.clear()
                    navigate("/")
                  }
                }}
                className="drop border-[1px] p-1 lg:pt-1 lg:pb-1.5 w-20   self-center text-sm border-red-500 text-red-500 dark:text-white dark:bg-red-700 font-semibold rounded-[10px] opacity-0">
                Logout
              </motion.button> :
            
            <motion.button animate={logoutControls} className="drop border-[1px] p-1 lg:pt-1 lg:pb-1.5 w-20 self-center text-sm border-red-500 text-red-500 dark:text-white dark:bg-red-700 font-semibold rounded-[10px] opacity-0">
              Spectating
            </motion.button>

            )}

        </motion.div>
        
        <motion.img
          onClick={() => {setIsProfileDropdownOpen((prevState) => !prevState);}}
          animate={avatarControls}
          src="https://banner2.cleanpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
          alt="I"
          className="drop rounded-full h-8 w-8 absolute left-2 top-1"
        />

        <div className="absolute right-2"
          onClick={() => {setIsProfileDropdownOpen((prevState) => !prevState);}}
        >   
          {isProfileDropdownOpen ? <IoIosArrowUp  color= {darkMode ? "#fff" : "#000"} /> : <IoIosArrowDown color={darkMode ? "#fff" : "#000 "}/>}
        </div>
      </div>
  );
};

export default ProfileDropdown;
