"use client";

import { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { MdComputer } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Menubar = ({ onMenuSelect }) => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // handle action
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (onMenuSelect) {
      onMenuSelect(menu);
    }
    // Close mobile menu on menu item click
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col white shadow-2xl rounded-lg sticky top-40 bg-gray-100">
        <h2 className="flex items-center justify-center py-4 font-bold text-black text-lg">Menu</h2>
        <div className="w-full border-t-2 border-black"></div>
        <ul className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col gap-8 p-4">

            <button
              onClick={() => handleMenuClick("dashboard")}
              className={`flex gap-4 ${activeMenu === "dashboard" ? "text-customPurple-default" : ""
                } hover:text-customPurple-hover transition-all`}
            >
              <CiMenuBurger size={24} />
              <li>Dashboard</li>
            </button>


            <button
              onClick={() => handleMenuClick("create")}
              className={`flex gap-4 ${activeMenu === "create" ? "text-customPurple-default" : ""
                } hover:text-customPurple-hover transition-all`}
            >
              <IoCreateOutline size={24} />
              <li>Create</li>
            </button>

            <button
              onClick={() => handleMenuClick("myevent")}
              className={`flex gap-4 ${activeMenu === "myevent" ? "text-customPurple-default" : ""
                } hover:text-customPurple-hover transition-all`}
            >
              <MdComputer size={24} />
              <li>My Event</li>
            </button>
          </div>
        </ul>
      </aside>

      {/* Mobile Sidebar */}
      <div className="lg:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-black text-2xl"
        >
          {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <aside className="fixed top-0 left-0 w-full h-fit bg-gray-100 shadow-lg z-40">
          <h2 className="flex items-center justify-center py-4 font-bold text-black text-lg">Menu</h2>
          <div className="w-full border-black"></div>
          <ul className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col gap-8 p-4">
              <button
                onClick={() => handleMenuClick("create")}
                className={`flex gap-4 ${activeMenu === "create" ? "text-customPurple-default" : ""
                  } hover:text-customPurple-hover transition-all`}
              >
                <IoCreateOutline size={24} />
                <li>Create</li>
              </button>

              <button
                onClick={() => handleMenuClick("myevent")}
                className={`flex gap-4 ${activeMenu === "myevent" ? "text-customPurple-default" : ""
                  } hover:text-customPurple-hover transition-all`}
              >
                <MdComputer size={24} />
                <li>My Event</li>
              </button>

              <button
                onClick={() => handleMenuClick("dashboard")}
                className={`flex gap-4 ${activeMenu === "dashboard" ? "text-customPurple-default" : ""
                  } hover:text-customPurple-hover transition-all`}
              >
                <CiMenuBurger size={24} />
                <li>Dashboard</li>
              </button>
            </div>
          </ul>
        </aside>
      )}
    </>
  );
};

export default Menubar;
