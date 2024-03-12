import { Link } from "react-router-dom";
import logo from "./img/Z-AnonymityLogo.svg";

import { CiMenuBurger } from "react-icons/ci";

function App() {
  return (
    <div className=" w-screen max-w-screen-2xl h-screen mx-auto overflow-x-hidden">
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
      <div className="w-full flex justify-center overflow-x-hidden">
        <span className="h-32 w-64 lg:w-[600px] z-50  bg-hero bg-contain bg-no-repeat bg-center absolute top-60 lg:top-48" />

        <span className="h-56 w-36 lg:w-80 bg-hindi bg-contain bg-no-repeat bg-center absolute -left-8 top-16 lg:top-24  lg:-left-20" />
        <span className="h-56 w-36 lg:w-80   bg-spanish bg-contain bg-no-repeat bg-center absolute -right-10 lg:-right-32" />
        <span className="h-56  w-36 lg:w-80 bg-japnese bg-contain bg-no-repeat bg-center absolute top-[500px] left-0  lg:top-[450px] lg:left-20" />
        <span className="h-56 w-36 lg:w-80   bg-russian bg-contain bg-no-repeat bg-center absolute top-[450px]  lg:top-96 right-0" />

        <span className="h-96 w-[350px] lg:w-[900px] bg-trail bg-contain bg-no-repeat bg-center absolute top-[200px]" />

        <div className="absolute top-[442px] lg:top-[535px] border-2 bg-white border-black rounded-2xl px-12 py-4 cursor-pointer hover:translate-y-1 z-50">
          Start texting
        </div>
        <div className="absolute top-[450px] lg:top-[545px] border-2 border-black bg-black rounded-2xl px-12 py-4 cursor-pointer z-0">
          Start texting
        </div>
        <div className="absolute text-center top-[390px] text-[15px] lg:top-96 lg:text-4xl font-semibold">
          Connecting strangers around the world in a single click
        </div>
      </div>
    </div>
  );
}

export default App;
