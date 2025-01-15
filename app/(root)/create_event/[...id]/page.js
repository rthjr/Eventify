"use client";
import EventDetail from "@components/layout/EventDetail";
import { useState, useEffect } from "react";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import SurveyForm from "@components/FormCard/SurveyForm";
import Button from "@components/Button/Button";
import ResultSurveyForm from "@components/FormCard/ResultSurveyForm";
import { useRouter } from "@node_modules/next/navigation";
import emailjs, { send } from '@emailjs/browser';
import { use } from "react";

const DynamicRoutePage = ({ params }) => {
  const [activeView, setActiveView] = useState("viewDetail");
  const [eventData, setEventData] = useState(null);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const router = useRouter();
  const [isSurveyFormVisible, setIsSurveyFormVisible] = useState(false);
  const [senders, setSenders] = useState([])
  const [responder, setResponder] = useState({
    responderEmails: {},
    eventID: null,
  });

  const unwrappedParams = use(params);
  const { id } = unwrappedParams || {};
  const eventIdNumber = Number(id);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://coding-fairy.com/api/mock-api-resources/1734491523/eventify"
        );
        const result = await response.json();
        const event = result.find((event) => event.id === eventIdNumber);
        setEventData(event);
        setSenders(event.registerEmail);
        setResponder({ eventID: eventIdNumber });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [eventIdNumber]);

  console.log(senders)
   const onSubmitButton = async () => {
    console.log(selectedEmails)
    console.log(responder)
    setResponder({ responderEmails: selectedEmails})
    console.log(responder)
    try {
       const response = await fetch(
        "https://coding-fairy.com/api/mock-api-resources/1734491523/responder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responder),
        }
      );

      if(!response.ok){
        console.log('cannot post request')
      }

      const emailPromises = selectedEmails.map((email) => {
        const templateParams = {
          to_email: email,
          to_name: email,
          message: 'https://github.com/goktugcy/hono-boilerplate/blob/main/src/middlewares/authMiddleware.ts',
        };
    
        return emailjs.send(
          "service_okd15r2",
          "template_uuxk1ab",
          templateParams,
          "beDn_1Gr5miERdH1L"
        );
      });

      try {
        const emailResults = await Promise.all(emailPromises);
        console.log("Emails sent successfully:", emailResults);
        alert("Emails sent to selected participants.");
      } catch (error) {
        console.error("Error sending emails:", error);
        alert("Failed to send some emails.");
      }
    
    } catch (error) {
      throw new Error("fetching error");
    }
  };

  const handleSelectEmail = (email) => {
    setSelectedEmails((prev) => {
      const updatedEmails = prev.includes(email)
        ? prev.filter((e) => e !== email)
        : [...prev, email];

      setResponder((prevResponder) => ({
        ...prevResponder,
        responderEmail: updatedEmails,
      }));

      return updatedEmails;
    });
  };

  const handleSelectAll = () => {
    if (eventData?.registerEmail) {
      const allSelected =
        selectedEmails.length === eventData.registerEmail.length;
      const updatedEmails = allSelected ? [] : [...eventData.registerEmail];

      setSelectedEmails(updatedEmails);
      setResponder((prevResponder) => ({
        ...prevResponder,
        responderEmail: updatedEmails,
      }));
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
                        ${
                          activeView === "createSurvey"
                            ? "bg-blue-500 text-white"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
            onClick={() => setActiveView("createSurvey")}
          >
            Create Survey
          </button>
          <button
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm 
                        ${
                          activeView === "resultSurvey"
                            ? "bg-blue-500 text-white"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
            onClick={() => setActiveView("resultSurvey")}
          >
            Result Survey
          </button>
          <button
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm 
                        ${
                          activeView === "viewDetail"
                            ? "bg-blue-500 text-white"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
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
                          eventData?.registerEmail &&
                          selectedEmails.length ===
                            eventData.registerEmail.length
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
                        <td>{index + 1}</td>
                        <td>{email}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        <span>No registered emails available.</span>
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
              onClick={onSubmitButton}>
                Submit Feedback
              </button>
              ==
            </div>
          </div>
        )}
        {activeView === "resultSurvey" && (
          <div className="m-auto w-5/12">
            <ResultSurveyForm
              detailSurvey="yes"
              eventIdNumber={eventIdNumber}
              senders = { senders }
            />
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default DynamicRoutePage;
