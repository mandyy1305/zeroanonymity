
import { useEffect } from "react";
import { setChameleon, setUserSelected, setUser_2, user_2 } from "../../backend/src/GlobalValues";
import { FlatTree, motion, useAnimation } from "framer-motion";
const UserlistItem = ({username, updateSelectedUserFunc,setReRender ,startAnimation, reRender, darkMode}) => {


    const textControls = useAnimation();

    const controls = useAnimation();

    const handleClick = async () => {    
      if(username !== user_2){    
        await setUser_2(username);
        setReRender(!reRender)

        startAnimation();
        setUserSelected(true);
        updateSelectedUserFunc(username);
        setChameleon(true);
      }
    }

    useEffect(()=>{
      console.log("Hi guys")
      if(username !== user_2){
        controls.set({backgroundColor: darkMode ? "#212121" : "#fff"})
        textControls.set({color: darkMode ? "#fff" : "#000"})

      }
      else{
        controls.set({backgroundColor: darkMode ? "#C77CFF" : "#006EA7"})
        textControls.set({color: darkMode ? "#000" : "#fff"})

      }
    },[reRender])

    const onHoverEnter = () => {
      if(username !== user_2){
      controls.start({backgroundColor: [darkMode ? "#212121" : "#ffffff", darkMode ? "#C77DFF" : "#006EA7"]})
      textControls.start({color: [darkMode ? "#fff" : "#000", darkMode ? "#000" : "#fff"]})
      }

    }
    const onHoverExit = () => {
      if(username !== user_2){
      controls.start({backgroundColor: [darkMode ? "#C77DFF" : "#006EA7", darkMode ? "#212121" : "#ffffff"]})
      textControls.start({color: [darkMode ? "#000" : "#fff", darkMode ? "#fff" : "#000"]})
      }

    }

    return (

        <motion.div 
        animate={controls}
        onMouseEnter={onHoverEnter}
        onMouseLeave={onHoverExit}
        className=" border-[1px] border-gray-600 flex rounded-bl-[30px] rounded-tr-[30px] rounded-tl-xl rounded-br-xl  items-center pl-8 py-3 my-[4px] cursor-pointer" onClick={()=>{handleClick();}}>

        <img
            src="https://banner2.cleanpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
            alt="I"
            className="rounded-full h-12 w-12 "
          />
          <motion.span
                animate={textControls}
                onMouseEnter={onHoverEnter}
                onMouseLeave={onHoverExit}
                className="ml-4 text-lg  font-bold bg-transparent text-black">{username}</motion.span>
        </motion.div>
    );
  };
  
  export default UserlistItem;