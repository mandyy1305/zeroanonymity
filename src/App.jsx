import { Link, Outlet, NavLink } from "react-router-dom";
import logo from "./img/Z-AnonymityLogo.svg";
import { MdOutlineDarkMode } from "react-icons/md";
import { FaCircleHalfStroke } from "react-icons/fa6";

import { IoMenu, IoClose } from "react-icons/io5";

import { useEffect, useState } from "react";
import ProfileDropdown from "./components/ProfileDropdown";

function App() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      console.log("<OKOKOKOK></OKOKOKOK>");
      const confirmationMessage = "Are you sure you want to leave this page?";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col w-screen h-screen  mx-auto bg-white">
      <nav className=" bg-[#36007B] text-white w-full flex items-center justify-between h-[55px]">
        <div>
          <IoMenu
            className="lg:hidden "
            size={35}
            onClick={() => setIsNavbarOpen((prevState) => !prevState)}
          />
        </div>
        <Link to="/" className="w-36 relative left-6">
          <img className="" src={logo} alt="Logo" />
        </Link>
        <div className="hidden lg:flex justify-center items-center w-full gap-24 font-semibold text-lg ">
          <NavLink
            className="hover:text-zinc-400 border-solid border-gray-400 hover:border-b-2 px-2 "
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="hover:text-zinc-400 border-solid border-gray-400 hover:border-b-2 px-2 "
            to="/faq"
          >
            FAQ
          </NavLink>
          <NavLink
            className="hover:text-zinc-400 border-solid border-gray-400 hover:border-b-2 px-2 "
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className="hover:text-zinc-400 border-solid border-gray-400 hover:border-b-2 px-2 "
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
        {/* <MdOutlineDarkMode size={25} onClick={() => {setDarkMode(!darkMode);}}/> */}
        <FaCircleHalfStroke  size={25} color="#7f7f7f"/>


        <ProfileDropdown darkMode={darkMode}/>
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
      <Outlet context={{darkMode, setDarkMode}}/>
    </div>
  );
}

export default App;
