import { Link, Outlet } from "react-router-dom";
import logo from "./img/Z-AnonymityLogo.svg";

import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

function App() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <div className="flex flex-col w-screen h-screen max-w-screen-2xl mx-auto ">
      <nav className="flex items-center justify-between h-24">
        <Link to="/" className="w-36 absolute left-6">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="hidden lg:flex justify-center items-center w-full gap-24 font-semibold text-lg">
          <Link to="/">Home</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
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
