import React from "react";

const Input = ({ name, type, textArea }) => {
  const displayInput = () => {
    let labelText = name;
    if (type === "date") {
      labelText += " (month/day/year)";
    } else if (type === "time") {
      labelText += " (hour / minute)";
    }

    if (textArea && name) {
      return (
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="event name" className="font-medium text-black">
            {labelText}
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
            {labelText}
          </label>
          <input
            type={type}
            className="w-full p-4 rounded-lg border-2 border-black"
            placeholder="Enter name of Event"
          />
        </div>
      );
    } else if (name) {
      return (
        <label htmlFor="event name" className="font-medium text-black">
          {labelText}
        </label>
      );
    } else if (type) {
      return (
        <input
          type={type}
          className="w-full p-4 rounded-lg border-2 border-black"
          placeholder="Enter name of Event"
        />
      );
    }
  };

  return displayInput();
};

export default Input;
