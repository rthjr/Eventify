"use client"; // Enable client-side rendering
import { useSession } from "@node_modules/next-auth/react";
import { useEffect, useState } from "react";
import LoadingPage from "@components/util/Loading";
import NotFound from "@components/util/NotFound";

import { FaRegCheckCircle } from "react-icons/fa";
import { Router } from "@node_modules/next/router";
import { useRouter } from "@node_modules/next/navigation";
export default function ResponseForm() {
  const { data: session, status } = useSession();
  
  const router = useRouter();
  const [formData, setFormData] = useState({
    experienceRating: "",
    favoritePart: "",
    venueFeedback: "",
    topicsRelevant: "",
    favoriteSpeaker: "",
    organizationRating: "",
    registrationFeedback: "",
    networkingOpportunities: "",
    futureSuggestions: "",
    additionalComments: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [respondence, setRespondence] = useState([]);
  const [authorize, setAuthorize] = useState(false);
  const [respond, setRespond] = useState({});
  console.log(respondence);
  useEffect(() => {
    async function fetchResponder() {
      try {
        const response = await fetch(
          "https://coding-fairy.com/api/mock-api-resources/1734491523/responder"
        );
        if (!response.ok) {
          console.log("cannot fetch api");
        }
        const respondences = await response.json();
        setRespondence(respondences);
      } catch (error) {
        throw new Error(error);
      }
    }
    fetchResponder();
  }, []);

  useEffect(() => {
    const res = respondence.find((responder) => {
      const emails = responder.responderEmails || responder.responderEmail;
      return session?.user?.email && emails?.includes(session.user.email);
    });
    if (res) {
      setRespond(res);
      setAuthorize(true);
    }
  }, [respondence, session]);

  console.log(respond);
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingPage />
      </div>
    );
  }

  const handleCancel = () => {

    router.push("/");
  };

  //find the email compare to the session
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        eventID: respond.eventID,
        sender: session.user.email,
        feedback: formData,
      };
      const updateResponse = await fetch(
        `https://coding-fairy.com/api/mock-api-resources/1734491523/surveydata`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update event data.");
      }

      const resEmails = respond.responderEmail || [];
      const filterEmails = resEmails.filter(
        (email) => email !== session.user.email
      );
      respond.responderEmail = filterEmails;
      console.log(filterEmails);
      const updateRespondent = await fetch(
        `https://coding-fairy.com/api/mock-api-resources/1734491523/responder/${respond.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(respond),
        }
      );
      if (!updateRespondent) {
        console.log("cannot update respondent api ");
      }
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };

  if (submitted) {
    return (
      <div className="absolute top-0 right-0 h-full w-full z-50 flex items-center justify-center backdrop-blur-sm">
        <div className="bg-white shadow-lg w-fit text-white text-sm py-1 px-3 rounded-md mt-2 z-50">
          <div className="lg:w-96 lg:h-96 text-white text-sm py-2 px-4 rounded-md flex flex-col items-center justify-center">
            <FaRegCheckCircle size={100} color="green" />
            <span className="my-5 text-black">Survey Successful!</span>
            <button
              onClick={handleCancel}
              className="mt-2 bg-white text-black py-1 p-3 border-2 border-black rounded-md hover:bg-gray-200"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return authorize ? (
    <div>
      <form
        onSubmit={handleSubmit}
        className="border-2 border-black p-4 w-full rounded-md"
      >
        <h2 className="text-2xl font-bold mb-4">Event Feedback Survey</h2>

        <label className="block mb-4">
          Rate your overall experience:
          <input
            type="number"
            name="experienceRating"
            min="1"
            max="10"
            value={formData.experienceRating}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block mb-4">
          Was the venue comfortable and convenient?
          <select
            name="venueFeedback"
            value={formData.venueFeedback}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label className="block mb-4">
          Rate the event organization:
          <input
            type="number"
            name="organizationRating"
            min="1"
            max="10"
            value={formData.organizationRating}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block mb-4">
          Feedback on the registration process:
          <textarea
            name="registrationFeedback"
            value={formData.registrationFeedback}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block mb-4">
          Did you find networking opportunities useful?
          <select
            name="networkingOpportunities"
            value={formData.networkingOpportunities}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label className="block mb-4">
          What topics or themes would you like to see in the future?
          <textarea
            name="futureSuggestions"
            value={formData.futureSuggestions}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block mb-4">
          Additional comments:
          <textarea
            name="additionalComments"
            value={formData.additionalComments}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  ) : (
    <div className="absolute top-0 h-full right-0 w-full bg-gray-100 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white w-fit text-white text-sm  rounded-md z-50">
        <NotFound />
      </div>
    </div>
  );
}
