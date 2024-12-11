"use client"

import React from 'react'
import { RxAvatar } from "react-icons/rx";
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import { useState } from 'react';
import Events from '@components/All_Event/Events';
import { useEffect } from 'react';
import { useRouter } from '@node_modules/next/navigation';
import Loading from '@components/Loading/Loading';
import events from '@model/eventData';

// hook
import Link from "@node_modules/next/link";
import Image from "@node_modules/next/image";


// lib to check  login and sign up after login
import { signOut, useSession } from '@node_modules/next-auth/react';
import Button from '@components/Button/Button';

const My_Booking = () => {

  // State to manage which section is currently displayed
  const [activeSection, setActiveSection] = useState('myBooking');

  // Function to handle "My Booking" button click
  const handleBooking = () => {
    setActiveSection('myBooking');
  };

  // Function to handle "My Event" button click
  const handleEvents = () => {
    setActiveSection('myEvents');
  };

  // reload

  const { data: session, status } = useSession();
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(true);

  // Ensure loading state persists for at least 3000ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Filter states
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGroupEvent, setSelectedGroupEvent] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  const handleCheckboxChange = (filterType, value) => {
    if (filterType === "date") {
      setSelectedDates(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    } else if (filterType === "price") {
      setSelectedPrices(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    } else if (filterType === "category") {
      setSelectedCategories(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    } else if (filterType === "groupEvent") {
      setSelectedGroupEvent(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    }
  };

  // Filter events based on selected filters
  const filteredEvents = events.filter(event => {
    const dateMatch = selectedDates.length === 0 || selectedDates.includes(event.date);
    const priceMatch = selectedPrices.length === 0 || selectedPrices.includes(event.ticketEvent);
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(event.typeEvent);
    const groupEventMatch = selectedGroupEvent.length === 0 || selectedGroupEvent.includes(event.category);

    return dateMatch && priceMatch && categoryMatch && groupEventMatch;
  });

  const handleSeeMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  if (showLoading && status === 'unauthenticated') {
    return <Loading />;
  }

  // If unauthenticated, avoid rendering until redirection
  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div>
      <Header />
      <div className='w-full h-full my-20 flex flex-col justify-center items-center'>
        <div className='w-9/12 h-auto flex flex-col '>

          <div className='flex justify-between border-t-2 border-dotted border-black border-b-2 p-2 mb-8'>
            <div className='w-1/2 flex justify-center items-center'>
              <RxAvatar
                size={150}
              />
            </div>

            <div className='w-1/2 flex justify-center items-center'>
              {session && session.user ? (
                <div className='flex flex-col gap-4'>
                  <p>Name : {session.user?.lastName}</p>
                  <p>Email : {session.user?.email}</p>
                  <p>Date of Birth : 11/18/2024</p>
                </div>
              ) : (
                <div>
                  <p>Name : Null</p>
                  <p>Email : null</p>
                </div>
              )}
            </div>

            <div className='w-1/2 flex justify-center items-center'>
              <button className='bg-customPurple-default hover:bg-customPurple-hover text-white transition-all w-fit h-fit p-3 rounded-lg'>Update</button>
            </div>
          </div>

          <div className='flex gap-12 mb-8'>
            {/* Button for "My Booking" */}
            <button
              id='myBooking'
              className={`font-bold text-black border-b-2 ${activeSection === 'myBooking' ? 'border-b-customPurple' : 'border-b-transparent'} hover:border-b-2 hover:border-b-customPurple-hover transition-all`}
              onClick={handleBooking}
            >
              My Booking
            </button>

            {/* Button for "My Event" */}
            <button
              id='myEvents'
              className={`font-bold text-black border-b-2 ${activeSection === 'myEvents' ? 'border-b-customPurple' : 'border-b-transparent'} hover:border-b-2 hover:border-b-customPurple-hover transition-all`}
              onClick={handleEvents}
            >
              My Event
            </button>
          </div>

          {/* Conditionally render content for my booking*/}
          <div className='w-full h-auto'>
            {activeSection === 'myBooking' && (
              <div className='w-full'>
                <Events
                  pageEvent = "profile"
                  widthE = "w-full"
                  paramPage = "MyBookingProfile"
                  nameClass = "justify-between"
                  EventCreator="yes"
                />
              </div>
            )}
            
            {/* for my event sesstion */}
            {activeSection === 'myEvents' && (
              <div className = "w-full">
                <Events
                  EventCreator="yes"
                  widthE = "w-full"
                  nameClass= "justify-around"
                  pageEvent = "profile"
                  paramPage = "MyEventProfile"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default My_Booking