import { Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import logo from "./img/Z-AnonymityLogo.svg";
import { MdOutlineDarkMode } from "react-icons/md";
import { FaCircleHalfStroke } from "react-icons/fa6";

import { IoMenu, IoClose } from "react-icons/io5";

import { useEffect, useState } from "react";
import ProfileDropdown from "./components/ProfileDropdown";
import { setChameleon, setSpectatorMode, setUserSelected, setUser_1, setUser_2, spectatorMode, user_1 } from "../backend/src/GlobalValues";
import { logout } from "../backend/src/functions";

function App() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  const logoutFunction = async () => {
    if(user_1 !== ""){
      await logout(user_1);
      setIsLoggedIn(false)
      setSpectatorMode(false)
      setUser_1("")
      setUser_2("")
      setUserSelected(false)
      setChameleon(false)
      sessionStorage.clear()
    }
  }

  const reloadFunction = async () => {
    if(user_1 !== "" && !spectatorMode){
      sessionStorage.clear()
      sessionStorage.setItem("user_1", user_1)
    }
  }


  useEffect(() => {
    window.addEventListener('beforeunload', reloadFunction);
    
    return () => {
      window.removeEventListener('beforeunload', reloadFunction);
    };
  }, [history]);

  useEffect(() => {
    const func = async () => {
      await logout(sessionStorage.getItem("user_1"));
      sessionStorage.clear()
      navigate("/")
    }

    setIsLoggedIn(false)

    if(sessionStorage.getItem("user_1") !== null){
      console.log("Yah boy")
      func()
    }
    else{
      sessionStorage.clear()
      navigate("/")
    }
    if (sessionStorage.length === 0) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      }

  }, [darkMode]);



  return (
    <div className="flex flex-col w-screen h-screen  mx-auto bg-[#e4f5ff] dark:bg-[#f7ebff]">
      <nav className="bg-[#003049] dark:bg-[#2c003f] text-white w-full flex items-center justify-between h-[55px]">
        <div>
          <IoMenu
            className="lg:hidden "
            size={35}
            onClick={() => setIsNavbarOpen((prevState) => !prevState)}
          />
        </div>
        <Link to="/" className="w-36 relative left-6">
          <img 
            onClick={logoutFunction}
          className="pb-1" src={logo} alt="Logo" />
        </Link>
        <div className="hidden lg:flex justify-center items-center w-full gap-24 font-semibold text-lg ">
          <NavLink
            onClick={logoutFunction}
            className="hover:text-zinc-400 border-solid border-gray-400 hover:border-b-2 px-2 "
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={logoutFunction}
            className="hover:text-zinc-400 border-solid border-gray-400 hover:border-b-2 px-2 "
            to="/faq"
          >
            FAQ
          </NavLink>
          <NavLink
            onClick={logoutFunction}
            className="hover:text-zinc-400 border-solid border-gray-400 hover:border-b-2 px-2 "
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={logoutFunction}
            className="hover:text-zinc-400 border-solid border-gray-400 hover:border-b-2 px-2 "
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
        {/* <MdOutlineDarkMode size={25} onClick={() => {setDarkMode(!darkMode);}}/> */}
        <FaCircleHalfStroke className="darkicon absolute right-3 z-[70]" 
          style={{rotate:darkMode ? "180deg" : "0deg"}}
          onClick={() => {setDarkMode(!darkMode);}} size={25} color="#fff"
        />
        {isLoggedIn && <ProfileDropdown darkMode={darkMode} setIsLoggedIn={setIsLoggedIn}/>}

      </nav>

      {isNavbarOpen && (
        <div className="absolute top-0 w-full h-[100svh] bg-white flex gap-12 text-2xl font-semibold flex-col justify-center text-center items-center z-50">
          <IoClose
            className="lg:hidden absolute right-6"
            size={35}
            onClick={() => setIsNavbarOpen((prevState) => !prevState)}
          />
          <Link
            to="/"
            className="text-center top-20 px-8 py-3"
            onClick={() => setIsNavbarOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/faq"
            className="text-center top-40 px-8 py-3"
            onClick={() => setIsNavbarOpen(false)}
          >
            FAQ
          </Link>
          <Link
            to="/about"
            className="text-center -top-40 px-8 py-3"
            onClick={() => setIsNavbarOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-center -top-50 px-8 py-3"
            onClick={() => setIsNavbarOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
      <Outlet context={{darkMode, setDarkMode, setIsLoggedIn}}/>
    </div>
  );
}

export default App;
