"use client";

import EventDetail from "@components/layout/EventDetail";
import { useState, useEffect } from "react";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import SurveyForm from "@components/FormCard/SurveyForm";
import Button from "@components/Button/Button";
import ResultSurveyForm from "@components/FormCard/ResultSurveyForm";
import { useRouter } from "@node_modules/next/navigation";
import { use } from "react";

const DynamicRoutePage = ({ params }) => {
    const [activeView, setActiveView] = useState("viewDetail");
    const [eventData, setEventData] = useState(null);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const router = useRouter();
    const [isSurveyFormVisible, setIsSurveyFormVisible] = useState(false);


    const unwrappedParams = use(params);
    const { id } = unwrappedParams || {};
    const eventIdNumber = Number(id);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://coding-fairy.com/api/mock-api-resources/1734491523/eventify');
                const result = await response.json();
                const event = result.find((event) => event.id === eventIdNumber);
                setEventData(event);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [eventIdNumber]);

    const handleSelectEmail = (email) => {
        setSelectedEmails((prev) =>
            prev.includes(email)
                ? prev.filter((e) => e !== email)
                : [...prev, email]
        );
    };

    const handleSelectAll = () => {
        if (eventData?.registerEmail) {
            setSelectedEmails(
                selectedEmails.length === eventData.registerEmail.length
                    ? []
                    : [...eventData.registerEmail]
            );
        }
    };


    const toggleSurveyForm = () => {
        setIsSurveyFormVisible(!isSurveyFormVisible);
    };

    const handleBack = () => {
        router.back();
    };

    if (!eventData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full">
            <div className="w-full flex flex-col justify-center items-center gap-8">
                <Header />
                <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1 shadow-2xl gap-8">
                    <Button param="Back" onClick={handleBack} />
                    <button
                        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm 
                        ${activeView === "createSurvey" ? "bg-blue-500 text-white" : "text-gray-500 hover:text-gray-700"}`}
                        onClick={() => setActiveView("createSurvey")}
                    >
                        Create Survey
                    </button>
                    <button
                        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm 
                        ${activeView === "resultSurvey" ? "bg-blue-500 text-white" : "text-gray-500 hover:text-gray-700"}`}
                        onClick={() => setActiveView("resultSurvey")}
                    >
                        Result Survey
                    </button>
                    <button
                        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm 
                        ${activeView === "viewDetail" ? "bg-blue-500 text-white" : "text-gray-500 hover:text-gray-700"}`}
                        onClick={() => setActiveView("viewDetail")}
                    >
                        View Detail
                    </button>
                </div>

                {activeView === "viewDetail" && (
                    <EventDetail {...eventData} blockButton="true" />
                )}

                {activeView === "createSurvey" && (
                    <div className="m-auto  w-5/12">
                        <div className="flex flex-col gap-8 w-full">
                            <span className="text-start font-bold text-2xl text-black">
                                Select your registration!
                            </span>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <input
                                                type="checkbox"
                                                checked={
                                                    eventData?.registerEmail && selectedEmails.length === eventData.registerEmail.length
                                                }
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                        <th>ID</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventData?.registerEmail ? (
                                        eventData.registerEmail.map((email, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedEmails.includes(email)}
                                                        onChange={() => handleSelectEmail(email)}
                                                    />
                                                </td>
                                                <td>{index + 1}</td> {/* Display the ID as a sequential number */}
                                                <td>{email}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center' }}>
                                                No registered emails available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <button
                                onClick={toggleSurveyForm}
                                className="w-fit border-b-customPurple-default text-black p-2  hover:border-b-customPurple-hover border-b-2"
                            >
                                {isSurveyFormVisible ? "Hide Survey Form" : "View Survey Form"}
                            </button>

                            {isSurveyFormVisible && <SurveyForm viewOnly="yes" />}

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            >
                                Submit Feedback
                            </button>
                        </div>
                    </div>
                )}

                {activeView === "resultSurvey" && (
                    <div className="m-auto w-5/12">
                        <ResultSurveyForm
                            detailSurvey="yes"
                            eventIdNumber={eventIdNumber}
                        />
                    </div>
                )}

                <Footer />
            </div>
        </div>
    );
};

export default DynamicRoutePage;
