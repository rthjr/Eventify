
"use client"
import Link from "@node_modules/next/link";
import { signOut, useSession } from "next-auth/react";
import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"
import Category from "@components/Card/Category";
import EventCard from "@components/Card/EventCard";
import UpcomingEvent from "@components/Card/UpcomingEvent";
import { useState } from "react";

// react icon
import { FaSearch } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
//  swiper
import SwiperBanner from '../../components/Swiper/SwiperBanner';

export default function Home() {

  const [categoryDis, setCategoryDis] = useState("");

  // search query
  const [searchQuery, setSearchQuery] = useState("");


  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <div className="w-full h-auto flex flex-col justify-center items-center mt-12">
        <SwiperBanner />
        <div className="w-10/12 flex flex-col">
          <h2 className="font-bold text-black text-xl  my-12">Browse By Category</h2>

          {/* brow by category */}
          <div className="w-full h-auto mb-20">
            <Category
              onClick={setCategoryDis}
            />
          </div>

          {/* card event */}
          <div className="w-full h-auto mb-20">
            <EventCard
              page="homePage"
              categoryDis={categoryDis}
              searchQuery = {searchQuery}
            />
          </div>

          {/* upcoming event */}
          <div className="w-full h-auto mb-20">
            <h2 className="mb-12 text-black text-xl font-bold">Up Coming Events </h2>
            <UpcomingEvent
              page="homePage"
              categoryDis={categoryDis}
              searchQuery = {searchQuery}
            />
          </div>

          {/* create and find  */}
          <div className="flex flex-col mb-20 w-full rounded-md">
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

              <Link href="/create_event" className="hover:scale-110 transition-all">
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
          </div>


        </div>
      </div>

      <Footer />
    </>
  )
}