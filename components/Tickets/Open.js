import { IoMdArrowRoundBack } from "react-icons/io";
import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";
export default function Open({ticket, imageEvent, eventName, date, ticketEvent, typeEvent, location }) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-8/12 flex justify-center items-center h-screen ">
        <div className = " flex h-fit shadow-lg p-8 rounded-lg">
          {/* ui for the left side */}
          <div className="w-1/2 h-full flex justify-center items-center p-3">
            <div className="h-5/6">
              <div>
                <Link href={`/find_event/${ticket}`}>
                  <IoMdArrowRoundBack
                    size={24}
                  />
                </Link>
                <h2 className="text-center font-bold text-lg mb-8">Checkout</h2>
              </div>

              <p className="mb-8">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam rerum autem porro quae inventore laboriosam totam et nisi. Repellendus ea aperiam dignissimos doloribus eos accusantium at, non ad minima aliquid!</p>

              <button className="rounded-lg bg-customPurple-default hover:bg-customPurple-hover text-white p-2">Register</button>
            </div>
          </div>

          {/* ui for the right side */}
          <div className="w-1/2 h-5/6 flex justify-center">
            <div className="w-full flex flex-col p-3 border-l border-black">
              <div className="overflow-hidden w-full h-72 mb-8 relative rounded-lg">
                <Image
                  src={imageEvent}
                  alt={eventName}
                  layout='fill'
                  objectFit='cover'
                />
              </div>

              <span className="text-black mb-8">{typeEvent}</span>

              <h2 className="text-xl font-bold text-black mb-8">{eventName}</h2>

              <div className="mb-8">
                <span>Date</span>
                <span>{date}</span>F
              </div>

              <div>
                <p className="text-black font-bold text-lg">Location</p>
                <span>{location}</span>
              </div>

              <div className="mb-8 flex justify-between">
                <p>Ticket</p>
                <span>{ticketEvent}</span>
              </div>

              <div className=" flex justify-between">
                <p>Total</p>
                <span>$0.00</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}