"use client"; // Enable client-side rendering
import { useState } from "react";

const SurveyForm = ({ viewOnly }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submit-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("Failed to submit survey.");
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };

  if (submitted) {
    return <p className="text-green-500">Thank you for your feedback!</p>;
  }

  const isViewOnly = viewOnly === "yes";

  return (
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
          required={!isViewOnly}
          disabled={isViewOnly}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </label>

      <label className="block mb-4">
        Was the venue comfortable and convenient?
        <select
          name="venueFeedback"
          value={formData.venueFeedback}
          onChange={handleChange}
          required={!isViewOnly}
          disabled={isViewOnly}
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
          required={!isViewOnly}
          disabled={isViewOnly}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </label>

      <label className="block mb-4">
        Feedback on the registration process:
        <textarea
          name="registrationFeedback"
          value={formData.registrationFeedback}
          onChange={handleChange}
          required={!isViewOnly}
          disabled={isViewOnly}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </label>

      <label className="block mb-4">
        Did you find networking opportunities useful?
        <select
          name="networkingOpportunities"
          value={formData.networkingOpportunities}
          onChange={handleChange}
          required={!isViewOnly}
          disabled={isViewOnly}
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
          required={!isViewOnly}
          disabled={isViewOnly}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </label>

      <label className="block mb-4">
        Additional comments:
        <textarea
          name="additionalComments"
          value={formData.additionalComments}
          onChange={handleChange}
          required={!isViewOnly}
          disabled={isViewOnly}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </label>

      {!isViewOnly && (
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit Feedback
        </button>
      )}
    </form>
  );
};

export default SurveyForm;
