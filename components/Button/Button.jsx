import React from "react";

const Button = ({ param, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-customPurple-default hover:bg-customPurple-hover p-2 rounded-lg text-white"
    >
      {param}
    </button>
  );
};

export default Button;
