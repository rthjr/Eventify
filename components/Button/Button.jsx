import React from "react";

const Button = ({ param, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn sm:btn-1/2 md:btn-1/3 lg:btn-1/4 bg-customPurple-default hover:bg-customPurple-hover p-2 rounded-lg text-white"
    >
      {param}
    </button>
  );
};

export default Button;
