import Events from "@components/All_Event/Events";
import React from "react";

const MyEvent = () => {
  return (
    <div className="w-full h-auto flex flex-col p-4 font-bold text-lg ">
      <h2 className="text-2xl">My Events</h2>
      <Events 
        noMap = "no"
        EventCreator = "yes"
      />
    </div>
  );
};

export default MyEvent;
