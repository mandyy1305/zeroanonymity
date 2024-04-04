import { Link, Outlet, NavLink } from "react-router-dom";
import logo from "./img/Z-AnonymityLogo.svg";

import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

function App() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      console.log("<OKOKOKOK></OKOKOKOK>");
      const confirmationMessage = 'Are you sure you want to leave this page?';
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen max-w-screen-2xl mx-auto ">
      <nav className=" bg-[#003049] flex items-center justify-between h-20">
        <Link to="/" className="w-36 relative left-6">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="hidden lg:flex justify-center items-center w-full gap-24 font-semibold text-lg ">
          <NavLink
            className="hover:text-blue-800 text-white border-solid border-gray-400 hover:border-b-2 px-2 "
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="hover:text-blue-800 text-white border-solid border-gray-400 hover:border-b-2 px-2 "
            to="/faq"
          >
            FAQ
          </NavLink>
          <NavLink
            className="hover:text-blue-800 text-white border-solid border-gray-400 hover:border-b-2 px-2 "
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className="hover:text-blue-800 text-white border-solid border-gray-400 hover:border-b-2 px-2 "
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
        <div className="bg-white rounded-3xl h-10 w-[90px] px-2 relative right-12 mr-10 flex justify-center items-center gap-3 ">
          <img
            src="https://banner2.cleanpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
            alt="I"
            className="rounded-full h-8 w-8"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/32/32195.png"
            alt="I"
            className="rounded-full h-5 w-5"
          />
          </div>
        <IoMenu
          className="lg:hidden absolute right-6"
          size={35}
          onClick={() => setIsNavbarOpen((prevState) => !prevState)}
        />
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
