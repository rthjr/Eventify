"use client"

// hook
import Link from "@node_modules/next/link";
import Image from "@node_modules/next/image";
import { useState, useEffect } from "react";

// icon
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import Button from "@components/Button/Button";
import defaultFavorites from "@model/favoritePageData";

const Events = ({ favoritePage, EventCreator, nameClass, widthE, pageEvent, removeLike, paramPage, searchQuery }) => {

    const [eventData, setEventData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://coding-fairy.com/api/mock-api-resources/1734491523/eventify");
                const result = await response.json();
                setEventData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    // Filter states
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedGroupEvent, setSelectedGroupEvent] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8);

    // default event
    const [favorites, setFavorites] = useState({});

    // Initialize state with localStorage data or default favorites
    const [pageFavorite, setPageFavorite] = useState(() => {
        const storedFavorites = localStorage.getItem("pageFavorite");
        return storedFavorites ? JSON.parse(storedFavorites) : defaultFavorites;
    });

    // Save to localStorage whenever pageFavorite changes
    useEffect(() => {
        localStorage.setItem("pageFavorite", JSON.stringify(pageFavorite));
    }, [pageFavorite]);

    // Filter events based on selected filters
    const filteredEvents = eventData.filter(event => {
        // Search matching
        const matchesSearchQuery =
            !searchQuery || event.eventName.toLowerCase().includes(searchQuery.toLowerCase());

        // Categorizing ticket status
        const getTicketStatusCategory = (ticketEvent) => {
            if (ticketEvent === "open") return "Open";
            if (ticketEvent === "free") return "Free";
            return "Paid";
        };

        const ticketCategory = getTicketStatusCategory(event.ticketEvent);
        const priceMatch = selectedPrices.length === 0 || selectedPrices.includes(ticketCategory);

        // Categorizing event type
        const getEventTypeCategory = (eventType) => {
            if (eventType === "early_bird") return "Early Bird";
            if (eventType === "regular") return "Regular";
            return "Latest";
        };

        const eventTypeCategory = getEventTypeCategory(event.typeEvent);
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(eventTypeCategory);

        
        // Filters date matching
        const dateMatch = selectedDates.length === 0 || selectedDates.includes(event.date);

        // filter category
        const groupEventMatch = selectedGroupEvent.length === 0 || selectedGroupEvent.includes(event.category);

        // to allow favorite page only
        let isFavorite = true;
        if (pageEvent === "favorite") {
            isFavorite = pageFavorite[event.id];
        }

        // the event only if it matches search query and all the filters
        return matchesSearchQuery && dateMatch && priceMatch && categoryMatch && groupEventMatch && isFavorite;
    });


    const handleCheckboxChange = (filterType, value) => {
        if (filterType === "date") {
            setSelectedDates(prev =>
                prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
            );
        } else if (filterType === "ticketStatus") {
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

    // add card to favorite page
    // Add event to pageFavorite
    const handleAddToFavorite = (eventId) => {
        setPageFavorite(prev => ({
            ...prev,
            [eventId]: true,
        }));
    };

    // like
    const handleFavoriteCompo = (id) => {
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
        setPageFavorite(prev => {
            const updateFavorite = { ...prev };
            delete updateFavorite[eventId]
            return updateFavorite
        })
    }



    // Three dot menu rendering
    const threeDot = (eventId) => {
        if (pageEvent !== "history") {
            return (
                <>
                    <span className="text-black font-bold text-lg relative group cursor-pointer">
                        ...
                        <div className="absolute hidden group-hover:block bg-white text-black border-gray-300 rounded-lg shadow-lg">
                            <div className="p-2 flex flex-col gap-2">
                                {paramPage !== "profileMyEvent" && (
                                    <Link
                                        href={`/report?pageEvent=${pageEvent}`}
                                        className="hover:border-b-2 border-b-2 border-b-transparent  hover:border-b-black font-light text-sm"
                                    >
                                        Report
                                    </Link>
                                )}

                                {/* add to favorite page​ which is assign id to pageFavorite by id and set to true*/}
                                {pageEvent !== "favorite" && pageEvent !== "profile" && paramPage !== "profileMyEvent" && (
                                    <button
                                        onClick={() => handleAddToFavorite(eventId)}
                                        className={`hover:border-b-2 border-b-2 border-b-transparent hover:border-b-black font-light text-sm`}
                                        // disable button if already favorited
                                        disabled={!!pageFavorite[eventId]}
                                    >
                                        {pageFavorite[eventId] ? "Favorited" : "Favorite"}
                                    </button>
                                )}

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

                                {paramPage === "profileMyEvent" && (
                                    <div>
                                        {/* this delete logic only available in 24 hours if it exceeded pop up warning ui */}
                                        <button
                                            onClick={() => handleDeleteFavorite(eventId)}
                                            className="hover:border-b-2 border-b-2 border-b-transparent  hover:border-b-black font-light text-sm"
                                        >
                                            Delete
                                        </button>

                                        {/* enable to update the created data */}
                                        <Link
                                            href={`/updateDataEvent?eventID=${eventId}`}
                                            className="hover:border-b-2 border-b-2 border-b-transparent  hover:border-b-black font-light text-sm"
                                        >
                                            Update
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </span>
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
                                            {Array.from(new Set(eventData.map(event => event.date))).map((date, index) => (
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

                                    {/* ticket status Filter */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-black">Ticket Status</h3>
                                        <div className="space-y-2">
                                            {["Open", "Free", "Paid"].map((ticketStatus, index) => (
                                                <label key={index} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-4 w-4 text-blue-600"
                                                        checked={selectedPrices.includes(ticketStatus)}
                                                        onChange={() => handleCheckboxChange("ticketStatus", ticketStatus)}
                                                    />
                                                    <span className="text-gray-700">{ticketStatus}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>


                                    {/* Event Type Filter */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-black">Event Type</h3>
                                        <div className="space-y-2">
                                            {["Early Bird", "Regular", "Latest"].map((eventType, index) => (
                                                <label key={index} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-4 w-4 text-blue-600"
                                                        checked={selectedCategories.includes(eventType)}
                                                        onChange={() => handleCheckboxChange("category", eventType)}
                                                    />
                                                    <span className="text-gray-700">{eventType}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Category Filter */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-black">Category</h3>
                                        <div className="space-y-2">
                                            {Array.from(new Set(eventData.map(event => event.eventCategory))).map((category, index) => (
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
                                        {filteredEvents.length > 0 ? (
                                            filteredEvents.slice(0, visibleCount).map(event => {
                                                const { id, imageUrl, name, date, location, startTime, endTime, qr } = event;
                                                return (
                                                    <div key={id} className='w-auto h-auto rounded-lg shadow-2xl bg-white flex justify-between gap-4 p-4 transition-transform transform hover:scale-105'>
                                                        <div className='overflow-hidden w-52 lg:w-96 h-auto relative rounded-lg'>
                                                            <Image
                                                                src={imageUrl}
                                                                alt={name}
                                                                layout='fill'
                                                                objectFit='cover'
                                                            />
                                                            <div className='absolute top-2 right-2 z-20 flex'>
                                                                {/* handle favorite */}
                                                                {handleFavoriteCompo(id)}
                                                            </div>
                                                        </div>

                                                        <div className='w-64'>
                                                            <div className='flex justify-between my-3 w-full'>
                                                                <h2 className='text-black font-extrabold text-xl'>{name}</h2>
                                                                {threeDot(id)}
                                                            </div>

                                                            <div className='mb-3 flex justify-between'>
                                                                <h2 className='text-black font-semibold text-lg'>{date}</h2>
                                                            </div>

                                                            <div className='mb-3 flex justify-between'>
                                                                <h2 className='text-black font-semibold text-lg'>{startTime}</h2>
                                                                <h2 className='text-black font-semibold text-lg'>{endTime}</h2>
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
                                            })
                                        ) : (
                                            <div className="text-center text-gray-500">
                                                No events found.
                                            </div>
                                        )}
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