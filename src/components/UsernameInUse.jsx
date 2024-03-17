const UsernameInUse = () => {
    return (
        <div className=" text-center flex flex-col">
                    <span className=" font-bold text-lg mt-8">Oops, this username is already being used.</span>
                    <span className=" mt-4 font-semibold text-lg">Wait until it is available <br/> or <br/> Spectate the user</span>
                   <div className=" w-11/12 mx-auto  md:w-full  flex flex-col justify-evenly mt-8 p-4 border-2 border-black rounded-lg">
                        <p className="text-lg font-bold mt-4">Enter Spectator mode ?</p>
                        <div className=" flex flex-col justify-evenly items-center mt-6 gap-5 mb-4">
                            <button className="bg-black text-white font-semibold w-1/4 h-10 rounded-lg">Yes</button>
                            <button className="bg-white text-black font-semibold w-3/12 h-10 rounded-lg border-2 border-black">No</button>
                        </div>
                   </div>
                </div> 
    );
  };
  
  export default UsernameInUse;
  

