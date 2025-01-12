"use client"

import Image from 'next/image';
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useState } from 'react';
import style from "@styles/cardevent.module.css"
import React, { useRef } from 'react';
import { useRouter } from '@node_modules/next/navigation';
import Button from '@components/Button/Button';
import { useFavorite } from '@app/(root)/(form)/context/FavoriteContext';
const CardEvent = ({ id, name, date, startTime, endTime, imageUrl }) => {

    const { pageFavorite, handleAddToFavorite } = useFavorite();

    const router = useRouter()

    const [isFavorite, setIsFavorite] = useState(false);

    const [showFavoriteButton, setShowFavoriteButton] = useState(false);

    const handleToggle = () => {
        setIsFavorite(!isFavorite);
    }

    // hover around with 3d ani
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const { current } = cardRef;
        if (!current) return;

        const { left, top, width, height } = current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const deltaX = (e.clientX - centerX) / width;
        const deltaY = (e.clientY - centerY) / height;

        const rotationX = deltaY * 15; // Adjust 15 to your desired rotation degree
        const rotationY = deltaX * 15; // Adjust 15 to your desired rotation degree

        current.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
        const { current } = cardRef;
        if (current) {
            current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
    };

    const handleRouter = (e) => {
        e.preventDefault();
        router.push(`/find_event/${id}?pageEvent=${encodeURIComponent("/")}`);
    };

    // Three dot menu rendering
    const threeDot = (eventId) => {
        return (
            <>
                <span className="text-black font-bold text-lg relative group cursor-pointer">
                    ...
                    <div className="absolute hidden group-hover:block bg-white text-black border-gray-300 rounded-lg shadow-lg ">
                        <div className="p-2 flex flex-col gap-2">
                            <button
                                onClick={() => handleAddToFavorite(eventId)}
                                className={`hover:border-b-2 border-b-2 border-b-transparent hover:border-b-black font-light text-sm z-50`}
                                // disable button if already favorited
                                disabled={!!pageFavorite[eventId]}
                            >
                                {pageFavorite[eventId] ? "Favorited" : "Favorite"}
                            </button>

                        </div>
                    </div>
                </span>
            </>
        );
    }


    return (
        <div
            className={`${style.CardEvent} p-3 w-72 shadow-2xl bg-white rounded-lg`}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div>
                <div className='overflow-hidden w-full  h-48 relative rounded-lg'>
                    <Image
                        src={imageUrl}
                        alt={name}
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
                <h2 className='text-black font-extrabold text-xl'>{name}</h2>
                {/* <div className='z-[9999]'>
                    {threeDot(id)}
                </div> */}

                <div
                    className='relative'
                    onMouseEnter={() => setShowFavoriteButton(true)} // Show button on hover
                    onMouseLeave={() => setShowFavoriteButton(false)} // Hide button on mouse leave
                >
                    {showFavoriteButton ? (
                        <button
                            onClick={() => handleAddToFavorite(id)}
                            className={`bg-white text-black border-gray-300 rounded-lg shadow-lg p-2 font-light text-sm z-50`}
                            disabled={!!pageFavorite[id]}
                        >
                            {pageFavorite[id] ? "Favorited" : "Add to Favorite"}
                        </button>
                    ) : (
                        <span className="text-black font-bold text-lg cursor-pointer">
                            ...
                        </span>
                    )}
                </div>
            </div>

            <div className='mb-3 flex justify-between'>
                <label htmlFor="">Date</label>
                <h2 className='text-black font-semibold text-lg'>{date}</h2>
            </div>

            <div className='mb-3 flex justify-between'>
                <label htmlFor="">Start</label>
                <h2 className='text-black font-semibold text-lg'>{startTime}</h2>
            </div>

            <div className='mb-3 flex justify-between'>
                <label htmlFor="">End</label>
                <h2 className='text-black font-semibold text-lg'>{endTime}</h2>
            </div>

            <Button
                param="More Info"
                onClick={handleRouter}
            />
        </div>
    )
}

export default CardEvent;