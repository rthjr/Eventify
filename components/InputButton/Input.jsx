import React from "react";

const Input = ({ name, type, textArea }) => {
  const displayInput = () => {
    if (textArea && name) {
      return (
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="event name" className="font-medium text-black">
            {name}
          </label>
          <textarea
            name=""
            id=""
            className="w-full p-4 rounded-lg border-2 border-black"
            placeholder="Write anything here"
          ></textarea>
        </div>
      );
    } else if (textArea) {
      return (
        <textarea
          name=""
          id=""
          className="w-full p-4 rounded-lg border-2 border-black"
          placeholder="Write anything here"
        ></textarea>
      );
    } else if (name && type) {
      return (
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="event name" className="font-medium text-black">
            {name}
          </label>
          <input
            type={type}
            className="w-full p-4 rounded-lg border-2 border-black"
            required
            placeholder="Enter name of Event"
          />
        </div>
      );
    } else if (name) {
      return (
        <label htmlFor="event name" className="font-medium text-black">
          {name}
        </label>
      );
    } else if (type) {
      return (
        <input
          type={type}
          className="w-full p-4 rounded-lg border-2 border-black"
          required
          placeholder="Enter name of Event"
        />
      );
    }
  };

  return displayInput();
};

export default Input;
