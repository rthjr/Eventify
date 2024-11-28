import Image from "@node_modules/next/image";
import React from "react";
import { useRouter } from "@node_modules/next/navigation";
import { MdOutlineCreate } from "react-icons/md";

const Create = () => {
  const router = useRouter();

  const handleRoute = () => {
    router.push("/create_event/create")
  }

  return (
    <div className="p-4 w-full h-auto flex flex-col font-bold text-lg gap-8">
      <h2 className="text-2xl">Create Event</h2>
      <div className="w-60 rounded-lg flex flex-col items-center p-4 border-2 border-black gap-4">
        <MdOutlineCreate size={50} />
        <h3 className="font-light text-lg">Start Create Event</h3>
        <p className="text-justify font-light text-sm">
          Add all your event details, create new tickets, and set up recurring
          events.
        </p>
        <button onClick={handleRoute} className="bg-customPurple-default hover:bg-customPurple-hover p-2 transition-all rounded-lg text-white w-full">
          Start Now
        </button>
      </div>
      <h2>
        Benefits of Creating Event with{" "}
        <span className="text-2xl text-customPurple-default">Eventify</span>
      </h2>
      <div className="flex flex-col gap-12">
        <div className="flex justify-between items-center">
          {/* Image Section */}
          <div className="relative w-4/12 h-64 animate-popup">
            <Image
              src="/assets/CreateEvent/time.jpg"
              alt="event management"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* Vertical Line */}
          <div className="h-64 w-px bg-black mx-4 "></div>

          {/* Text Section */}
          <div className="w-4/12">
            <span className="block text-lg font-semibold mb-2">
              Event Management
            </span>
            <p className="text-justify font-light w-full">
              Tracks event performance with dashboards and analytics for
              registrations, ticket sales, and attendee engagement.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          {/* Text Section */}
          <div className="w-4/12">
            <span className="block text-lg font-semibold mb-2">
              Ticket Types and Policy
            </span>
            <p className="text-justify font-light w-full">
              Offer multiple ticket, Enable users to set ticket limits and the
              policy of cancellation.
            </p>
          </div>

          {/* Vertical Line */}
          <div className="h-64 w-px bg-black mx-4"></div>

          {/* Image Section */}
          <div className="relative w-4/12 h-64 animate-popup">
            <Image
              src="/assets/CreateEvent/policy.jpg"
              alt="event management"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          {/* Image Section */}
          <div className="relative w-4/12 h-64 animate-popup">
            <Image
              src="/assets/CreateEvent/management.jpg"
              alt="event management"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* Vertical Line */}
          <div className="h-64 w-px bg-black mx-4"></div>

          {/* Text Section */}
          <div className="w-4/12">
            <span className="block text-lg font-semibold mb-2">
              Enhanced Communication
            </span>
            <p className="text-justify font-light w-full">
              Enables direct communication with attendees via emails,
              notifications, or SMS updates. Allows sharing of real-time event
              updates, schedules, or changes instantly.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <button onClick={handleRoute} className="p-2 text-white bg-customPurple-default hover:bg-customPurple-hover rounded-lg">Create Now</button>
      </div>
    </div>
  );
};

export default Create;
