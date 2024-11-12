"use client"

import Image from 'next/image'; // Ensure Image is imported if using Next.js
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useState } from 'react';
const CardEvent = ({ imageEvent, eventName, date, creatorName, ticketEvent, typeEvent }) => {

    const [isFavorite, setIsFavorite] = useState(false);

    const handleToggle = () => {
        setIsFavorite(!isFavorite);
    }

    return (
        <div className='p-3 w-72 border-2 border-black rounded-lg bg-gray-200 '>
            <div>
                <div className='overflow-hidden w-full  h-48 relative rounded-lg'>
                    <Image
                        src={imageEvent}
                        alt={eventName}
                        layout='fill'
                        objectFit='cover'
                    />
                    <div className='absolute top-2 right-2 z-20 flex'>
                        {!isFavorite ? (
                            // Clickable when clicked on it
                            <MdFavoriteBorder
                                size={24}
                                onClick={handleToggle}
                            />
                        ) : (
                            // Then display this
                            <MdFavorite
                                size={24}
                                onClick={handleToggle}
                                color='red'
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className='flex justify-between my-3 '>
                <h2 className='text-black font-extrabold text-xl'>{eventName}</h2>
                <span className='text-black font-bold text-lg'>...</span>
            </div>

            <div className='mb-3 flex justify-between'>
                <h2 className='text-black font-semibold text-lg'>{date}</h2>
                <span className='text-black font-semibold text-lg'>{ticketEvent}</span>
            </div>

            <div className='mb-3 flex justify-between'>
                <h2 className='text-black font-semibold text-lg'>{creatorName}</h2>
                <h2 className='text-black font-semibold text-lg'>{typeEvent}</h2>
            </div>
            <button className='border-none bg-customPurple-default hover:bg-customPurple-hover text-white text-lg w-full rounded-lg p-2'>Book Now</button>
        </div>
    )
}

export default CardEvent;