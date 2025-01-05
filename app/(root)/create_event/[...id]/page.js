"use client"

import EventDetail from "@components/layout/EventDetail";
import { use, useState } from "react"; // Import `use` from React
import events from "@model/eventData";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import SurveyForm from "@components/FormCard/SurveyForm";
import Button from "@components/Button/Button";
import { useRouter } from "@node_modules/next/navigation";
import Table from "@components/util/Table";
import { ResultSurveyForm } from "@components/FormCard/ResultSurveyForm";

const DynamicRoutePage = ({ params }) => {
    const [activeView, setActiveView] = useState("viewDetail");
    const unwrappedParams = use(params);
    const router = useRouter()
    const { id } = router.query()
    // Ensure params are available before destructuring
    if (!unwrappedParams) {
        return <div>Loading...</div>;
    }

    // Check if `id` is a string or an array

    let eventId, eventDate;
    if (typeof id === "string") {
        // Split if id is a string
        [eventId, eventDate] = id.split(",");
    } else if (Array.isArray(id)) {
        // If id is an array, use the first item as the event ID and the second as the date
        [eventId, eventDate] = id;
    }

    const eventIdNumber = Number(eventId);

    // Find event by eventId
    const event = events.find((event) => event.id === eventIdNumber);

    // Get today's date
    const today = new Date();
    const eventDateObj = new Date(event.date);

    // Calculate the difference in days
    const timeDiff = eventDateObj - today;
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert ms to days

    const upcomingEvent = dayDiff >= 0; // Check if the event is upcoming

    const handleBack = () => {
        router.back()
    }


    // table for survey form 
    const thName = ["select", "name", "owner", "created", "updated", "Action"];
    const tData = [
        {
            id: 1,
            name: "jjjjjjjjjjjj",
            owner: "Zemlak, Daniel and Leannon",
            created: "Purple",
            updated: "12:30",
        },
        {
            id: 1,
            name: "jjjjjjjjjjjj",
            owner: "Zemlak, Daniel and Leannon",
            created: "Purple",
            updated: "12:30",
        },
        {
            id: 1,
            name: "jjjjjjjjjjjj",
            owner: "Zemlak, Daniel and Leannon",
            created: "Purple",
            updated: "12:30",
        },
    ];

    return (
        <div className="w-full">
            <div className="w-full flex flex-col justify-center items-center gap-8">
                <Header />
                <>

                    <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1 shadow-2xl gap-8">
                        <Button
                            param="Back"
                            onClick={handleBack}
                        />
                        <button
                            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative 
                        ${activeView === "createSurvey" ? "bg-blue-500 text-white" : "text-gray-500 hover:text-gray-700"}`}
                            onClick={() => setActiveView("createSurvey")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>

                            Create Survey
                        </button>

                        <button
                            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative ${activeView === "resultSurvey"
                                ? "bg-blue-500 text-white"
                                : "text-gray-500 hover:text-gray-700"}`}
                            onClick={() => setActiveView("resultSurvey")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>

                            Result Survey
                        </button>

                        <button
                            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative ${activeView === "viewDetail"
                                ? "bg-blue-500 text-white"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setActiveView("viewDetail")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 9h12M6 12h8m-8 3h6M9 6h6m-8 0h2a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2z"
                                />
                            </svg>


                            View Detail
                        </button>
                    </div>

                    {/* Render content based on active view */}
                    {activeView === "viewDetail" && (
                        <EventDetail
                            key={event.id}
                            ticket={event.id}
                            imageEvent={event.imageEvent}
                            eventName={event.eventName}
                            date={event.date}
                            creatorName={event.creatorName}
                            ticketEvent={event.ticketEvent}
                            typeEvent={event.typeEvent}
                            location={event.location}
                            eventQr={event.eventQr}
                            blockButton="true"
                        />
                    )}

                    {activeView === "createSurvey" && (
                        <div className="m-auto">
                            <div className="flex flex-col gap-8 w-full">
                                <span className="text-start font-bold text-2xl text-black">Select your registration!</span>

                                <Table thName={thName} tData={tData} selectAll = "yes"/>

                                <span className="text-start font-bold text-2xl text-black">Create Your Survey Form</span>

                                <SurveyForm />
                            </div>
                        </div>
                    )}

                    {activeView === "resultSurvey" && (
                        <>
                            <ResultSurveyForm detailSurvey = "yes"/>
                        </>
                    )}
                </>
                <Footer />
            </div>
        </div>
    );
};

export default DynamicRoutePage;
