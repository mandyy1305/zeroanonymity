import { Link, Outlet } from "react-router-dom";
import logo from "./img/Z-AnonymityLogo.svg";

import { CiMenuBurger } from "react-icons/ci";

function App() {
  return (
    <div className=" w-screen max-w-screen-2xl h-screen mx-auto ">
      <nav className="flex items-center justify-between h-24">
        <Link to="/" className="w-36 absolute left-6">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="hidden lg:flex justify-center items-center w-full gap-24 font-semibold text-lg">
          <Link to="/home">Home</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <CiMenuBurger className="lg:hidden absolute right-6" size={35} />
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
