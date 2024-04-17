import React from "react";

const DateCard = ({day, margin = "my-5"}) => {
  return (
    <div className=" flex justify-center align-middle my-2">
        <span className={`bg-[#ffffff76] text-black p-1 text-sm font-semibold px-4 rounded-md ${margin}`}>{day}</span>
    </div>
  );
};

export default DateCard;
