const SentMsg = (props) => {
    return (
        <div className=" my-1 flex justify-end">
            <span className="bg-[#b1e79c] p-1 rounded-lg px-4 border-[1px] border-black font-semibold align-middle max-w-[75%] h-auto text-left">{props.msg}</span>
        </div>
    );
  };
  
  export default SentMsg;
  



