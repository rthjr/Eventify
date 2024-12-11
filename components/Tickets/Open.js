import { IoMdArrowRoundBack } from "react-icons/io";
import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";
import Button from "@components/Button/Button";

export default function Open({
  ticket,
  imageEvent,
  eventName,
  date,
  ticketEvent,
  typeEvent,
  location,
  page,
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-lg flex flex-col lg:flex-row justify-center items-center min-h-screen gap-4">
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
          {/* right Side */}
          <div className="flex flex-col h-full">
            <Link href={`/${page}/${ticket}`}>
              <IoMdArrowRoundBack size={24} className="mb-4 cursor-pointer" />
            </Link>
            <h2 className="text-center font-bold text-lg sm:text-xl mb-6">
              Checkout
            </h2>
            <p className="mb-6 text-sm sm:text-base">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
              rerum autem porro quae inventore laboriosam totam et nisi.
              Repellendus ea aperiam dignissimos doloribus eos accusantium at,
              non ad minima aliquid!
            </p>

            <Button
              param = "Register"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
