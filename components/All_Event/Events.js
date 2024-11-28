"use client"

// hook
import Link from "@node_modules/next/link";
import Image from "@node_modules/next/image";
import { useState } from "react";

// icon
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const Events = ({ favoritePage, noMap, EventCreator }) => {

    const [events] = useState([
        { id: 1, imageEvent: "/assets/banner/conference.jpg", eventName: "Tech Summit", date: "Today", creatorName: "Giga", ticketEvent: "open", typeEvent: "Early Bird", location: "San Francisco", category: "sport" },
        { id: 2, imageEvent: "/assets/banner/sportEvent.jpg", eventName: "Marathon 2025", date: "Tomorrow", creatorName: "RunClub", ticketEvent: "open", typeEvent: "Regular", location: "New York", category: "conference" },
        { id: 3, imageEvent: "/assets/banner/techEvent.jpg", eventName: "Innovation Expo", date: "Today", creatorName: "TechWorld", ticketEvent: "open", typeEvent: "Regular", location: "Los Angeles", category: "technology" },
        { id: 4, imageEvent: "/assets/banner/conference2.jpg", eventName: "AI Conference", date: "Month", creatorName: "Giga AI", ticketEvent: "Free", typeEvent: "Late", location: "Boston", category: "technology" },
        { id: 5, imageEvent: "/assets/banner/conference.jpg", eventName: "Business Workshop", date: "Today", creatorName: "BizPro", ticketEvent: "open", typeEvent: "Early Bird", location: "Chicago", category: "technology" },
        { id: 6, imageEvent: "/assets/banner/sportEvent.jpg", eventName: "Soccer Finals", date: "Tomorrow", creatorName: "SportsMania", ticketEvent: "open", typeEvent: "Regular", location: "Dallas", category: "technology" },
        { id: 7, imageEvent: "/assets/banner/techEvent.jpg", eventName: "StartUp Launchpad", date: "Month", creatorName: "LaunchZone", ticketEvent: "open", typeEvent: "Regular", location: "Seattle", category: "technology" },
        { id: 8, imageEvent: "/assets/banner/conference2.jpg", eventName: "Healthcare Symposium", date: "Tomorrow", creatorName: "MedPlus", ticketEvent: "paid", typeEvent: "Early Bird", location: "Miami", category: "technology" },
        { id: 9, imageEvent: "/assets/banner/conference2.jpg", eventName: "Global Finance Meet", date: "Month", creatorName: "FinCon", ticketEvent: "open", typeEvent: "Regular", location: "London", category: "technology" },
    ]);

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

    // Store favorites by event id
    const [favorites, setFavorites] = useState({});

    // Toggle favorite for a specific event
    const handleToggleFavorite = (eventId) => {
        setFavorites(prev => ({
            ...prev,
            [eventId]: !prev[eventId],
        }));
    };

    return (
        <div className="mt-10">
            {favoritePage === "yes" ? (
                <h2 className="text-xl text-center font-bold">Favorite</h2>
            ) : (<></>)}
            <div className="w-full h-auto flex justify-center">
                <div className="w-12/12 mb-20 mt-10 flex">
                    <div className="m-auto">
                        <div className='w-full flex gap-9'>
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
                            <div>
                                <div className="h-auto flex w-full justify-center">
                                    <div className="grid grid-cols-1 gap-9">
                                        {filteredEvents.slice(0, visibleCount).map(event => {
                                            const { id, imageEvent, eventName, date, ticketEvent, location, creatorName, typeEvent } = event;
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
                                                            {favorites[id] ? (
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
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className='w-64'>
                                                        <div className='flex justify-between my-3 w-full'>
                                                            <h2 className='text-black font-extrabold text-xl'>{eventName}</h2>
                                                            <span className='text-black font-bold text-lg relative group cursor-pointer'>
                                                                ...
                                                                <div className='absolute hidden group-hover:block bg-white text-black border-gray-300 rounded-lg shadow-lg'>
                                                                    <div className='p-2 flex flex-col'>
                                                                        <Link href="">Delete</Link>
                                                                        <Link href="">Report</Link>
                                                                    </div>
                                                                </div>
                                                            </span>
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
                                                            <Link href={`/create_event/${event.id}/${event.date}`}>
                                                                <button className="border-none bg-customPurple-default hover:bg-customPurple-hover text-white text-lg w-full rounded-lg p-2">
                                                                    Detail Event
                                                                </button>
                                                            </Link>
                                                        ) : (
                                                            <Link href={`/find_event/${event.id}`}>
                                                                <button className="border-none bg-customPurple-default hover:bg-customPurple-hover text-white text-lg w-full rounded-lg p-2">
                                                                    Book Now
                                                                </button>
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* See More Button */}
                                <div className="w-full flex items-center justify-center">
                                    {visibleCount < filteredEvents.length && (
                                        <button
                                            onClick={handleSeeMore}
                                            className="mt-12 p-3 bg-customPurple-default hover:bg-customPurple-hover transition-all text-white rounded"
                                        >
                                            See More
                                        </button>
                                    )}
                                </div>
                            </div>

                            {noMap === "no" ? (
                                <></>
                            ) : (
                                <div className="hidden lg:flex overflow-hidden ">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125075.71622455529!2d104.80761429061442!3d11.579352549906696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be3%3A0x9c010ee85ab525bb!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1731427195001!5m2!1sen!2skh"
                                        width="500"
                                        height="450"
                                        className="border-0 rounded-lg shadow-lg"
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Events