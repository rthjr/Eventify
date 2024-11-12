"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoSearch } from 'react-icons/io5';
import { IoEllipsisVertical } from 'react-icons/io5';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex w-full items-center justify-center py-3 shadow-md">
      <nav className="flex items-center justify-between w-10/12">
        <Image
          src="/assets/logo/eventifyLogo.png"
          alt="logo website"
          width={120}
          height={50}
        />

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
          <li className="py-2 px-6 border-b-2 border-transparent hover:border-customPurple-hover transition duration-300 ease-in-out">
            <Link href="/login">Login</Link>
          </li>
          <li className="py-2 px-6 border-b-2 border-transparent hover:border-customPurple-hover transition duration-300 ease-in-out">
            <Link href="/signup">Sign up</Link>
          </li>
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
        {isMobileMenuOpen && (
          <ul className="lg:hidden absolute top-16 right-5 w-40 bg-white shadow-lg rounded-lg p-3 z-50">
            <li className="py-2 border-b border-gray-200 z-50">
              <Link href="/create" onClick={toggleMobileMenu}>Create Event</Link>
            </li>
            <li className="py-2 border-b border-gray-200">
              <Link href="/favorite" onClick={toggleMobileMenu}>Favorite</Link>
            </li>
            <li className="py-2 border-b border-gray-200">
              <Link href="/login" onClick={toggleMobileMenu}>Login</Link>
            </li>
            <li className="py-2">
              <Link href="/signup" onClick={toggleMobileMenu}>Sign up</Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Header;
