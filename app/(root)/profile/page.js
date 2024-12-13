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


// lib to check  login and sign up after login
import { useSession } from '@node_modules/next-auth/react';
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


  // handle update user profile
  const [name, setName] = useState(session?.user?.lastName || "Default")
  const [email, setEmail] = useState(session?.user?.email || "default@gmail.com")
  const [dateOfBirth, setDateOfBirth] = useState("11/12/2024")
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)


  const handleUpdateUserProfile = () => {
    setIsPopupOpen(true)
  }

  const handleConfirmUpdate = () => {
    setIsPopupOpen(false);
  };

  const handleCancelUpdate = () => {
    setIsPopupOpen(false);
  };

  // prevent scrolling when model popup
  useEffect(() => {
    // Disable scrolling when the popup is open
    if (isPopupOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isPopupOpen]);

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

          {/* Profile Details Section */}
          <div className='flex flex-col items-center'>
            {/* Profile Section */}
            <div className='flex justify-between border-t-2 border-dotted border-black border-b-2 p-2 mb-8 w-full'>
              <div className='w-1/2 flex justify-center items-center'>
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className='w-36 h-36 rounded-full object-cover'
                  />
                ) : (
                  <RxAvatar size={150} className='text-gray-400' />
                )}
              </div>

              <div className='w-1/2 flex flex-col justify-center items-start gap-4'>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Date of Birth: {dateOfBirth}</p>
                <Button param="Update" onClick={handleUpdateUserProfile} />
              </div>
            </div>

            {/* Popup/Modal */}
            {isPopupOpen && (
              <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]'>
                <div className='bg-white p-8 rounded shadow-lg w-96'>
                  <h2 className='text-xl font-bold mb-4'>Update Profile</h2>
                  <div className='flex flex-col gap-4'>

                    <div className='flex flex-col items-center gap-2'>
                      <label>Profile Picture</label>
                      {profileImage ? (
                        <img src={`${previewImage}`} alt="profile preview" className='w-24 h-24 rounded-full object-full' />
                      ) : (
                        <RxAvatar size={96} className='text-gray-400' />
                      )}
                      <input type="file"
                        accept='image/*'
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            setProfileImage(file)
                            setPreviewImage(URL.createObjectURL(file))
                          }
                        }}
                        className='border p-2 rounded w-full'
                      />
                    </div>

                    <label>
                      Name:
                      <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='border p-2 rounded w-full'
                      />
                    </label>

                    <label>
                      Email:
                      <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border p-2 rounded w-full'
                      />
                    </label>

                    <label>
                      Date of Birth:
                      <input
                        type='date'
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className='border p-2 rounded w-full'
                      />
                    </label>

                  </div>
                  <div className='flex justify-end gap-4 mt-6'>
                    <Button
                      onClick={handleCancelUpdate}
                      param="Cancel"
                    />
                    <Button
                      onClick={handleConfirmUpdate}
                      param="Confirm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* end profile update */}

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
                  pageEvent="profile"
                  widthE="w-full"
                  paramPage="MyBookingProfile"
                  nameClass="justify-between"
                  EventCreator="yes"
                />
              </div>
            )}

            {/* for my event sesstion */}
            {activeSection === 'myEvents' && (
              <div className="w-full">
                <Events
                  EventCreator="yes"
                  widthE="w-full"
                  nameClass="justify-around"
                  pageEvent="profile"
                  paramPage="MyEventProfile"
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