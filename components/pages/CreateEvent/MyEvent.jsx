"use client";

import Events from "@components/All_Event/Events";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const MyEvent = ({ paramPage, pageEvent, searchQuery, paramSu }) => {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");

  // Set email from session
  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  return (
    <div className="w-full h-auto flex flex-col font-bold gap-8 text-lg">
      <h2 className="text-2xl">My Events</h2>
      {paramSu && <span>Select the Event to manage the survey!</span>}
      <Events
        gaps="gap-8"
        EventCreator="yes"
        nameClass="w-full justify-between"
        widthE="w-full"
        paramPage={paramPage}
        pageEvent={pageEvent}
        searchQuery={searchQuery}
        email={email}
      />
    </div>
  );
};

export default MyEvent;