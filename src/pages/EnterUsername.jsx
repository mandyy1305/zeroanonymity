import { useState } from "react";
import UsernameInUse from "../components/UsernameInUse";
import { login } from "../../backend/src/functions";
import {  spectatorMode } from "../../backend/src/GlobalValues";
import { useNavigate } from "react-router-dom";
// var isIdActive = require("./GlobalValues");

const EnterUsername = () => {
 
    const navigateTo = useNavigate();
    function ToChatPage() {
      navigateTo("/Chats");
    }
    const [usernameActiveStatus,setUsernameActiveStatus] = useState(false);
    const[userId,setUserId]=useState("");
    //for bakchodi
      var checkStatus = ()=>{
        if(spectatorMode){
          setUsernameActiveStatus(true);
        }else{
          setUsernameActiveStatus(false);
          ToChatPage();

          // window.location.href='/chats';
          // event.preventDefault();
        }
      }
      // const successLogin=()=>{
      //   window.location.href='/chats';
      // }   
    //for bakchodi
    // database se fetch krna pdega ki username active ya nhi or uske baad idhr show or hide kr denge.    
    return (
        <div className=" flex justify-center items-center h-5/6 md:h-4/5 flex-col ">
                <span className=" text-3xl font-bold align-middle">Enter Username:</span>
                <div className="flex justify-around items-center mt-4 w-11/12 sm:w-2/3 md:w-[450px] h-12">
                    <input className="bg-gray-200 border-[1px] text-base border-black rounded-xl h-10 sm:h-12 px-2 sm:px-4 py-2 w-4/5 mx-2" placeholder="I am..." id="UsernameInput" onChange={(e)=>setUserId(e.target.value)}/>
                    <button className="bg-black text-white w-1/5 rounded-2xl h-10 sm:h-12" >Go</button>
                </div>
                {usernameActiveStatus && <UsernameInUse/>}
        </div>
    );
  };
  
export default EnterUsername;