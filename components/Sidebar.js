"use client"

import { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { MdComputer } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";

const Sidebar = ({ onMenuSelect }) => {

    const [activeMenu, setActiveMenu] = useState('create');

    // handle action 
    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        if (onMenuSelect) {
            onMenuSelect(menu)
        }
    }

    return (
        <aside className='flex flex-col white shadow-2xl rounded-lg sticky top-40 bg-gray-100'>
            <h2 className="flex items-center justify-center py-4 font-bold text-black text-lg">Menu</h2>
            <div className='w-full border-t-2 border-black'></div>
            <ul className="w-full h-full flex justify-center items-center">
                <div className="flex flex-col gap-8 p-4">
                    <button
                        onClick={() => handleMenuClick('create')}
                        className={`flex gap-4 ${activeMenu === 'create' ? 'text-customPurple-default' : ''} hover:text-customPurple-hover transition-all`}
                    >
                        <IoCreateOutline
                            size={24}
                        />
                        <li>Create</li>
                    </button>

                    <button
                        onClick={() => handleMenuClick('myevent')}
                        className={`flex gap-4 ${activeMenu === 'myevent' ? 'text-customPurple-default' : ''} hover:text-customPurple-hover transition-all`}
                    >
                        <MdComputer
                            size={24}
                        />
                        <li>My Event</li>
                    </button>

                    <button
                        onClick={() => handleMenuClick('dashboard')}
                        className={`flex gap-4 ${activeMenu === 'dashboard' ? 'text-customPurple-default' : ''} hover:text-customPurple-hover transition-all`}
                    >
                        <CiMenuBurger
                            size={24}
                        />
                        <li>Dashboard</li>
                    </button>
                </div>
            </ul>
        </aside>
    )
}

export default Sidebar;