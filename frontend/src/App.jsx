import { Link } from "react-router-dom";
import logo from "./img/Z-AnonymityLogo.svg";

function App() {
  return (
    <div className=" w-screen max-w-screen-2xl h-screen mx-auto overflow-x-hidden">
      <nav className="flex items-center h-24">
        <Link to="/" className="w-36 absolute left-10">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="flex justify-center items-center w-full gap-24 font-semibold text-lg">
          <Link to="/home">Home</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
      <div className="w-full flex justify-center overflow-x-hidden">
        <span className="h-32 w-[600px]   bg-hero bg-no-repeat bg-center z-50 absolute top-48" />

        <span className="h-56 w-80 bg-hindi bg-no-repeat bg-center z-0 absolute -left-20" />
        <span className="h-56 w-80   bg-spanish bg-no-repeat bg-center z-0 absolute -right-32" />
        <span className="h-56  w-72 bg-japnese bg-no-repeat bg-center z-0 absolute  top-[450px] left-20" />
        <span className="h-56 w-72   bg-russian bg-no-repeat bg-center z-0 absolute top-96 right-0" />

        <span className="h-96 w-[900px] bg-trail bg-no-repeat bg-center z-50 absolute top-[200px]" />
        <div className="absolute top-[535px] border-2 bg-white border-black rounded-2xl px-12 py-4 cursor-pointer hover:translate-y-1 z-50">
          Start texting
        </div>
        <div className="absolute top-[545px] border-2 border-black bg-black rounded-2xl px-12 py-4 cursor-pointer z-0">
          Start texting
        </div>
        <div className="absolute top-96 text-4xl font-semibold">
          connecting strangers around the world in a single click
        </div>
      </div>
    </div>
  );
}

export default App;
