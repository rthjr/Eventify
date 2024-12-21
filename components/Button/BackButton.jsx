import React from "react";

const BackButton = ({ param, onClick }) => {
  return (
    <button
      className="btn bg-customPurple-default text-white hover:bg-customPurple-hover border-none sm:btn-1/2 md:btn-1/3 lg:btn-1/4 "
      onClick={onClick}
    >
      {param}
    </button>
  );
};

export default BackButton;
