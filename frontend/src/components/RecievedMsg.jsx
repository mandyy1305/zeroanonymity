const RecievedMsg = (props) => {
    return (
        <div className=" my-1 flex justify-start">
            <span className="bg-[#083556] p-1 rounded-lg px-4 text-white font-semibold text-center align-middle">
                {props.msg}</span>
        </div>
    );
  };
  
  export default RecievedMsg;