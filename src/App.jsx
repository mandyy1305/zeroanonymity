import { Link, Outlet, NavLink } from "react-router-dom";
import logo from "./img/Z-AnonymityLogo.svg";

import { IoMenu, IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { VscChromeClose } from "react-icons/vsc";
import { useEffect, useState } from "react";

function App() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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

  return (
    <div className="flex flex-col w-screen h-screen  mx-auto bg-yellow-100">
      <nav className="  flex items-center justify-between h-16 lg:mx-12">
        <div>
          <IoMenu
            className="lg:hidden "
            size={35}
            onClick={() => setIsNavbarOpen((prevState) => !prevState)}
          />
        </div>
        <Link to="/" className="w-36 relative left-6">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="hidden lg:flex justify-center items-center w-full gap-24 font-semibold text-lg ">
          <NavLink
            className="hover:text-blue-800 border-solid border-gray-400 hover:border-b-2 px-2 "
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="hover:text-blue-800 border-solid border-gray-400 hover:border-b-2 px-2 "
            to="/faq"
          >
            FAQ
          </NavLink>
          <NavLink
            className="hover:text-blue-800 border-solid border-gray-400 hover:border-b-2 px-2 "
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className="hover:text-blue-800 border-solid border-gray-400 hover:border-b-2 px-2 "
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
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
      <Outlet />
    </div>
  );
}

export default App;
