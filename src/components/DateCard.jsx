import React from "react";

const DateCard = (props) => {
  return (
    <div className=" flex justify-center align-middle my-2">
        <span className="bg-[#1e609a6f] text-black p-1 text-sm font-semibold px-4 rounded-md">{props.day}</span>
    </div>
  );
};

export default DateCard;
