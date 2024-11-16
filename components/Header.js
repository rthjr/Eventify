"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoSearch } from 'react-icons/io5';
import { IoEllipsisVertical } from 'react-icons/io5';
import { CgProfile } from "react-icons/cg";

// lib to check  login and sign up after login
import { signOut, useSession } from '@node_modules/next-auth/react';

const Header = () => {

  const { data: session } = useSession();
  console.log(session);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // hover dropdown 
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <div className="flex w-full items-center justify-center py-3 shadow-md sticky top-0 z-50 bg-white">
      <nav className="flex items-center justify-between w-10/12">
        <Link href ="/">
          <Image
            src="/assets/logo/eventifyLogo.png"
            alt="logo website"
            width={120}
            height={50}
          /></Link>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex border-2 rounded-lg border-black w-1/5 justify-between items-center p-2">
          <input
            type="text"
            className="hidden lg:flex border-none focus:outline-none"
            placeholder="Enter text here"
          />
          <button>
            <IoSearch />
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex flex-wrap items-center justify-center border-b-2 border-transparent">
          <li className="py-2 px-6 border-b-2 border-transparent hover:border-customPurple-hover transition duration-300 ease-in-out">
            <Link href="/create">Create Event</Link>
          </li>
          <li className="py-2 px-6 border-b-2 border-transparent hover:border-customPurple-hover transition duration-300 ease-in-out">
            <Link href="/favorite">Favorite</Link>
          </li>

          {session && session.user ? (
            <div
              className='relative flex gap-4 cursor-pointer p-4'
              onMouseEnter={() => setIsDropdownVisible(true)}
              onMouseLeave={() => setIsDropdownVisible(false)}
              aria-expanded={isDropdownVisible}
              aria-label="User menu"
            >
              <CgProfile size={24} />
              <span>{session.user?.lastName}</span>

              {isDropdownVisible && (
                <div className='absolute left-0 top-full mt-0 h-fit z-40 bg-white shadow-lg rounded-md w-56'>
                  <span
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </span>
                  <span className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>My Ticket</span>
                  <span className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Booked</span>
                </div>
              )}
            </div>
          ) : (
            <div className='flex'>
              <li className="py-2 px-6 border-b-2 border-transparent hover:border-customPurple-hover transition duration-300 ease-in-out">
                <Link href="/login">Login</Link>
              </li>
              <li className="py-2 px-6 border-b-2 border-transparent hover:border-customPurple-hover transition duration-300 ease-in-out">
                <Link href="/signup">Sign up</Link>
              </li>
            </div>
          )}

        </ul>

        {/* Mobile Menu Icon */}
        <button
          className="lg:hidden text-2xl"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <IoEllipsisVertical />
        </button>

        {/* Mobile Menu */}
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <ul className="lg:hidden absolute top-16 right-5 w-40 bg-white shadow-lg rounded-lg p-3 z-50">
            <li className="py-2 border-b border-gray-200">
              <Link href="/create" onClick={toggleMobileMenu}>Create Event</Link>
            </li>
            <li className="py-2 border-b border-gray-200">
              <Link href="/favorite" onClick={toggleMobileMenu}>Favorite</Link>
            </li>

            {session && session.user ? (
              <div className="">

                <div className="flex flex-col z-50">
                  <span
                    className=' py-2 border-b'
                    onClick={() => {
                      signOut();
                      toggleMobileMenu();
                    }}
                  >
                    Sign Out
                  </span>
                  <span className=' py-2 border-b'>My Ticket</span>
                  <span className=' py-2 border-b'>Booked</span>
                  <div onClick={toggleMobileMenu} className='flex gap-2 py-2 '>
                    <CgProfile size={24} />
                    <span>{session.user?.lastName}</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <li className="py-2 border-b border-gray-200">
                  <Link href="/login" onClick={toggleMobileMenu}>Login</Link>
                </li>
                <li className="py-2">
                  <Link href="/signup" onClick={toggleMobileMenu}>Sign up</Link>
                </li>
              </>
            )}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Header;
