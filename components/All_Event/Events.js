"use client"

// hook
import Link from "@node_modules/next/link";
import Image from "@node_modules/next/image";
import { useState } from "react";

// icon
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import Button from "@components/Button/Button";
import events from "@model/eventData";

const Events = ({ favoritePage, EventCreator, nameClass, widthE, pageEvent, removeLike, paramPage }) => {

    // Filter states
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedGroupEvent, setSelectedGroupEvent] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8);

    // default event
    const [favorites, setFavorites] = useState({
        1: true,
        2: true,
    });

    // Filter events based on selected filters
    const filteredEvents = events.filter(event => {
        const dateMatch = selectedDates.length === 0 || selectedDates.includes(event.date);
        const priceMatch = selectedPrices.length === 0 || selectedPrices.includes(event.ticketEvent);
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(event.typeEvent);
        const groupEventMatch = selectedGroupEvent.length === 0 || selectedGroupEvent.includes(event.category);

        // to allow favorite page only
        let isFavorite = true;
        if (pageEvent === "favorite") {
            isFavorite = favorites[event.id];
        }

        return dateMatch && priceMatch && categoryMatch && groupEventMatch && isFavorite;
    });

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

    const handleSeeMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };


    // Toggle favorite for a specific event
    const handleToggleFavorite = (eventId) => {
        setFavorites(prev => ({
            ...prev,
            [eventId]: !prev[eventId],
        }));
    };

    // like
    const handleFavoriteCompo = (id) => {
        if (removeLike) {
            return (
                <MdFavorite
                    size={24}
                    color='red'
                    style={{ cursor: 'not-allowed' }}
                />
            );
        }
        return favorites[id] ? (
            <MdFavorite
                size={24}
                onClick={() => handleToggleFavorite(id)}
                color='red'
            />
        ) : (
            <MdFavoriteBorder
                size={24}
                onClick={() => handleToggleFavorite(id)}
            />
        );
    };

    // function delete event from favorite page
    const handleDeleteFavorite = (eventId) => {
        setFavorites(prev => {
            const updateFavorite = { ...prev };
            delete updateFavorite[eventId]
            return updateFavorite
        })
    }


    // Three dot menu rendering
    const threeDot = (eventId) => {
        if (pageEvent) {
            return (
                <>
                    {paramPage !== "MyEventProfile" && (
                        <span className="text-black font-bold text-lg relative group cursor-pointer">
                            ...
                            <div className="absolute hidden group-hover:block bg-white text-black border-gray-300 rounded-lg shadow-lg">
                                <div className="p-2 flex flex-col gap-2">
                                    <Link
                                        href={`/report?pageEvent=${pageEvent}`}
                                        className="hover:border-b-2 border-b-2 border-b-transparent  hover:border-b-black font-light text-sm"
                                    >
                                        Report
                                    </Link>

                                    {pageEvent === "favorite" && (
                                        <button
                                            onClick={() => handleDeleteFavorite(eventId)}
                                            className="hover:border-b-2 border-b-2 border-b-transparent  hover:border-b-black font-light text-sm"
                                        >
                                            Delete
                                        </button>
                                    )}

                                    {paramPage === "MyBookingProfile" && (
                                        <Link
                                            href={`/cancellation?pageEvent=${pageEvent}`}
                                            className="hover:border-b-2 border-b-2 border-b-transparent  hover:border-b-black font-light text-sm"
                                        >
                                            Cancellation
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </span>
                    )}
                </>
            );
        }
        return null;
    };

    return (
        <>
            <div className="mt-10 w-full flex flex-col justify-center items-center">
                {favoritePage === "yes" ? (
                    <h2 className="text-xl text-center font-bold">Favorite</h2>
                ) : (<></>)}
                <div className={`${widthE} h-auto`}>
                    <div className="w-full mb-20 mt-10 flex justify-center items-center">
                        <div className={`w-full flex ${nameClass}`}>
                            {/* Filter Section */}
                            <div>
                                <div className="hidden lg:flex flex-col space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-lg font-bold text-black">Filters</h2>
                                        <button
                                            onClick={() => {
                                                setSelectedDates([]);
                                                setSelectedPrices([]);
                                                setSelectedCategories([]);
                                                setSelectedGroupEvent([]);
                                            }}
                                            className="border-none text-blue-600 underline"
                                        >
                                            Reset
                                        </button>
                                    </div>

                                    {/* Date Filter */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-black">Date</h3>
                                        <div className="space-y-2">
                                            {Array.from(new Set(events.map(event => event.date))).map((date, index) => (
                                                <label key={index} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-4 w-4 text-blue-600"
                                                        checked={selectedDates.includes(date)}
                                                        onChange={() => handleCheckboxChange("date", date)}
                                                    />
                                                    <span className="text-gray-700">{date}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Filter */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-black">Ticket Status</h3>
                                        <div className="space-y-2">
                                            {Array.from(new Set(events.map(event => event.ticketEvent))).map((price, index) => (
                                                <label key={index} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-4 w-4 text-blue-600"
                                                        checked={selectedPrices.includes(price)}
                                                        onChange={() => handleCheckboxChange("price", price)}
                                                    />
                                                    <span className="text-gray-700">{price}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Event Type Filter */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-black">Event Type</h3>
                                        <div className="space-y-2">
                                            {Array.from(new Set(events.map(event => event.typeEvent))).map((type, index) => (
                                                <label key={index} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-4 w-4 text-blue-600"
                                                        checked={selectedCategories.includes(type)}
                                                        onChange={() => handleCheckboxChange("category", type)}
                                                    />
                                                    <span className="text-gray-700">{type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Category Filter */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-black">Category</h3>
                                        <div className="space-y-2">
                                            {Array.from(new Set(events.map(event => event.category))).map((category, index) => (
                                                <label key={index} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-4 w-4 text-blue-600"
                                                        checked={selectedGroupEvent.includes(category)}
                                                        onChange={() => handleCheckboxChange("groupEvent", category)}
                                                    />
                                                    <span className="text-gray-700">{category}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Event Display Section */}
                            {/* delete from favorite */}
                            <div>
                                <div className="h-auto flex w-full justify-center">
                                    <div className="grid grid-cols-1 gap-9">
                                        {filteredEvents.slice(0, visibleCount).map(event => {
                                            const { id, imageEvent, eventName, date, ticketEvent, location, creatorName, typeEvent, qr } = event;
                                            return (
                                                <div key={id} className='w-auto h-auto rounded-lg shadow-2xl bg-white flex justify-between gap-4 p-4 transition-transform transform hover:scale-105'>
                                                    <div className='overflow-hidden w-52 lg:w-96 h-auto relative rounded-lg'>
                                                        <Image
                                                            src={imageEvent}
                                                            alt={eventName}
                                                            layout='fill'
                                                            objectFit='cover'
                                                        />
                                                        <div className='absolute top-2 right-2 z-20 flex'>
                                                            {/* handle favorite */}
                                                            {handleFavoriteCompo()}
                                                        </div>
                                                    </div>

                                                    <div className='w-64'>
                                                        <div className='flex justify-between my-3 w-full'>
                                                            <h2 className='text-black font-extrabold text-xl'>{eventName}</h2>
                                                            {threeDot(id)}
                                                        </div>

                                                        <div className='mb-3 flex justify-between'>
                                                            <h2 className='text-black font-semibold text-lg'>{date}</h2>
                                                            <span className='text-black font-semibold text-lg'>{ticketEvent}</span>
                                                        </div>

                                                        <div className="mb-3">
                                                            <h2 className='text-black font-semibold text-lg'>{location}</h2>
                                                        </div>

                                                        <div className='mb-3 flex justify-between'>
                                                            <h2 className='text-black font-semibold text-lg'>{creatorName}</h2>
                                                            <h2 className='text-black font-semibold text-lg'>{typeEvent}</h2>
                                                        </div>

                                                        {EventCreator === "yes" ? (
                                                            <Link href={`/${pageEvent}/${event.id}`}>
                                                                <Button
                                                                    param="Detail Event"
                                                                />
                                                            </Link>
                                                        ) : (
                                                            <Link href={`/${pageEvent}/${event.id}`}>
                                                                <Button
                                                                    param="Book Now"
                                                                />
                                                            </Link>
                                                        )}
                                                    </div>

                                                    {paramPage === "MyBookingProfile" && (
                                                        <div className='overflow-hidden h-auto rounded-lg p-4'>
                                                            <Image
                                                                src={qr}
                                                                alt="QR"
                                                                layout="responsive"
                                                                width={500}  // Set base width
                                                                height={500} // Set base height to maintain aspect ratio
                                                                objectFit='cover'
                                                                className='border-2 border-black'
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* See More Button */}
                                <div className="w-full flex items-center justify-center mt-12">
                                    {visibleCount < filteredEvents.length && (
                                        <Button
                                            onClick={handleSeeMore}
                                            param="See More"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Events