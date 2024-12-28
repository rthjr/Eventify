import Events from "@components/All_Event/Events";
import React from "react";

const MyEvent = ({paramPage,pageEvent, searchQuery, paramSu}) => {
  return (
    <div className="w-full h-auto flex flex-col font-bold gap-8 text-lg">
      <h2 className="text-2xl">My Events</h2>
      {
        paramSu && (
          <span>Select the Event to manage the survey!</span>
        )
      }
      <Events 
        gaps = "gap-8"
        EventCreator = "yes"
        nameClass = "w-full justify-between"
        widthE="w-full"
        paramPage={paramPage}
        pageEvent={pageEvent}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default MyEvent;