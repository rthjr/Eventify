import Events from "@components/All_Event/Events";
import React from "react";

const MyEvent = () => {
  return (
    <div className="w-full h-auto flex flex-col font-bold text-lg ">
      <h2 className="text-2xl">My Events</h2>
      <Events 
        noMap = "no"
        EventCreator = "yes"
        widthE = "w-4/12"
        gapE = "gap-8"
      />
    </div>
  );
};

export default MyEvent;
