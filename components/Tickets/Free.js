"use client"
import { IoMdArrowRoundBack } from "react-icons/io";
import Image from "@node_modules/next/image";
import Button from "@components/Button/Button";
import { useRouter } from "@node_modules/next/navigation";

export default function Free({
  imageEvent,
  eventName,
  date,
  ticketEvent,
  typeEvent,
  location,
}) {
  const router = useRouter()
  const handleBackClick = () => {
    router.back(); // This will navigate to the previous page in the browser history
  };
  return (
    <div className="w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-lg gap-4 flex flex-col lg:flex-row justify-center items-center min-h-screen">
        {/* left Side */}
        <div className="lg:w-1/2 w-full mt-8 lg:mt-0 lg:ml-6">
          <div className="border-2 border-black rounded-lg p-4">
            <div className="relative w-full h-72 sm:h-96 mb-6 rounded-lg overflow-hidden">
              <Image
                src={imageEvent}
                alt={eventName}
                layout="fill"
                objectFit="cover"
              />
            </div>

            <span className="text-sm sm:text-base text-black mb-4 block">
              {typeEvent}
            </span>

            <h2 className="text-lg sm:text-xl font-bold text-black mb-4">
              {eventName}
            </h2>

            <div className="mb-4">
              <p className="text-sm sm:text-base text-gray-600">Date</p>
              <span className="text-sm sm:text-base text-black">{date}</span>
            </div>

            <div className="mb-4">
              <p className="text-sm sm:text-base font-bold text-black">
                Location
              </p>
              <span className="text-sm sm:text-base text-black">{location}</span>
            </div>

            <div className="mb-4 flex justify-between">
              <p className="text-sm sm:text-base text-gray-600">Ticket</p>
              <span className="text-sm sm:text-base text-black">
                {ticketEvent}
              </span>
            </div>

            <div className="flex justify-between">
              <p className="text-sm sm:text-base text-gray-600">Total</p>
              <span className="text-sm sm:text-base text-black">$0.00</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:w-1/2 w-full border-2 border-black rounded-lg p-4">
          {/* Left Side */}
          <div className="flex flex-col h-full">
            <div className="w-fit h-fit">
              <Button
                onClick={handleBackClick}
                param={
                  <IoMdArrowRoundBack size={24} className="cursor-pointer" />}
              /> 
            </div>
            <h2 className="text-center font-bold text-lg mb-6">Checkout</h2>
            <p className="mb-6 text-sm sm:text-base">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
              rerum autem porro quae inventore laboriosam totam et nisi.
              Repellendus ea aperiam dignissimos doloribus eos accusantium at,
              non ad minima aliquid!
            </p>

            <form className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col w-full lg:w-1/2">
                  <label htmlFor="firstName" className="mb-2 text-sm">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    className="p-2 text-black border border-black rounded-lg w-full"
                  />
                </div>
                <div className="flex flex-col w-full lg:w-1/2">
                  <label htmlFor="lastName" className="mb-2 text-sm">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    className="p-2 text-black border border-black rounded-lg w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter email for notification"
                  className="p-2 text-black border border-black rounded-lg w-full"
                />
              </div>

              <Button
                param="Register"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
