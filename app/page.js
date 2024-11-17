
"use client"
import Link from "@node_modules/next/link";
import { signOut, useSession } from "next-auth/react";
import Header from "../components/Header"
import Footer from "../components/Footer"
import Category from "@components/Card/Category";
import EventCard from "@components/Card/EventCard";
import UpcomingEvent from "@components/Card/UpcomingEvent";

// react icon
import { FaSearch } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";

//  swiper
import SwiperBanner from '../components/Swiper/SwiperBanner';

export default function Home() {

  const { data: session } = useSession()
  console.log(session)
  return (
    <>
      <Header />
      <div className="w-full h-auto flex flex-col justify-center items-center mt-12">
        <SwiperBanner />
        {/* put content here */}
        <h1>
          {/* {session && session.user ? (
            <div>
              <p> Welcome, {session.user?.email}!  </p>
              <p> Welcome, {session.user?.lastName}!  </p>
              <button onClick={signOut}>Log out</button>
            </div>
          ) : (
            <div>
              <p>please sign in</p>
            </div>

          )} */}

          {/* put content here */}
        </h1>
        <div className="w-10/12 flex flex-col">
          <h2 className="font-bold text-black text-xl  my-12">Browse By Category</h2>

          {/* brow by category */}
          <div className="w-full h-auto mb-20">
            <Category />
          </div>

          {/* card event */}
          <div className="w-full h-auto mb-20">
            <EventCard />
          </div>

          {/* upcoming event */}
          <div className="w-full h-auto mb-20">
            <h2 className="mb-12 text-black text-xl font-bold">Up Coming Events </h2>
            <UpcomingEvent />
          </div>

          {/* create and find  */}
          <dir className="flex flex-col mb-20 w-full rounded-md">
            <h2 className="font-bold text-black text-xl  mb-12">How Eventify work?</h2>
            <div className="flex flex-wrap gap-6">

              <Link href="/find_event" className="hover:scale-110 transition-all">
                <div className="flex flex-col w-full shadow-lg rounded-lg p-4 lg:p-6 bg-gray-200">
                  <div className="p-4 lg:p-6 text-2xl">
                    <FaSearch />
                  </div>
                  <div>
                    <span className="text-bold text-lg text-black">Search Events
                      <u> Click me</u>
                    </span>
                  </div>
                </div>
              </Link>

              <Link href="/" className="hover:scale-110 transition-all">
                <div className="flex flex-col w-full shadow-lg rounded-lg p-4 lg:p-6 bg-gray-200">
                  <div className="p-4 lg:p-6 text-2xl">
                    <IoCreateOutline />
                  </div>
                  <div>
                    <span className="text-bold text-lg text-black">Create Events
                      <u> Click me</u>
                    </span>
                  </div>
                </div>
              </Link>

            </div>
          </dir>


        </div>
      </div>
      <Footer />
    </>
  )
}