import React from "react";

const BackButton = ({ param }) => {
  return (
    <button className="btn border-b-2 border-b-black hover:border-b-customPurple-hover btn-xs sm:btn-sm md:btn-md lg:btn-lg ">
      {param}
    </button>
  );
};

export default BackButton;
