import React from "react";

const BackButton = ({ param, onClick }) => {
  return (
    <button
      className="btn border-b-2 border-b-black hover:border-b-customPurple-hover btn-xs sm:btn-sm md:btn-md lg:btn-lg "
      onClick={onClick}
    >
      {param}
    </button>
  );
};

export default BackButton;
