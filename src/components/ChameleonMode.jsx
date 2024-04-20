import { setChameleon, setSpectatorMode, setUserSelected, setUser_1, setUser_2, spectatorMode, user_1, user_2 } from "../../backend/src/GlobalValues";
import { login, logout } from "../../backend/src/functions";
import { useNavigate } from "react-router-dom";

const ChameleonMode = ({setCurrentUserFunc}) => {
    const navigateTo = useNavigate();

    const logoutFunction = async () => {
      if(user_1 !== ""){
        if(!spectatorMode){
          await logout(user_1);
        }
        setSpectatorMode(false)
        setUser_1("")
        setUserSelected(false)
        setChameleon(false)
        sessionStorage.clear()
      }
    }

    const loginFunction = async () => {
        await login(user_2); 
        setCurrentUserFunc(user_2) ;
        setUser_2("")
        setChameleon(false);
        setUserSelected(false);
    } 

    return(
          <button className=" my-auto mr-20 h-[36px] flex justify-center items-center px-2 rounded-xl border-[2px] dark:border-[#a775e4] border-blue-600" onClick={async () => {
            await logoutFunction();
            await loginFunction();
          }}>
            <p className=" font-bold dark:text-[#a775e4] text-blue-600">Chameleon Mode</p>
          </button>

    )
}

export default ChameleonMode;