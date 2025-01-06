"use client";
import { useState, useEffect } from "react";

const ResultSurveyForm = ({ detailSurvey, eventIdNumber }) => {
  const [eventData, setEventData] = useState(null);
  const [selectedEmails, setSelectedEmails] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://coding-fairy.com/api/mock-api-resources/1734491523/eventify"
        );
        const result = await response.json();
        const event = result.find((event) => event.id === eventIdNumber);
        setEventData(event || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [eventIdNumber]);

  const handleSelectAll = (e) => {
    if (e.target.checked && eventData?.registerEmail) {
      setSelectedEmails([...eventData.registerEmail]);
    } else {
      setSelectedEmails([]);
    }
  };

  const handleEmailSelect = (email) => {
    setSelectedEmails((prevSelected) =>
      prevSelected.includes(email)
        ? prevSelected.filter((e) => e !== email)
        : [...prevSelected, email]
    );
  };

  if (!eventData) {
    return <p>Loading event data...</p>;
  }

  return (
    <table className="border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">
            <input
              type="checkbox"
              checked={
                selectedEmails.length === eventData.registerEmail?.length
              }
              onChange={handleSelectAll}
            />
          </th>
          <th className="border border-gray-300 p-2">ID</th>
          <th className="border border-gray-300 p-2">Email</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {eventData.registerEmail?.map((email, index) => (
          <tr key={index}>
            <td className="border border-gray-300 p-2">
              <input
                type="checkbox"
                checked={selectedEmails.includes(email)}
                onChange={() => handleEmailSelect(email)}
              />
            </td>
            <td className="border border-gray-300 p-2">{index + 1}</td>
            <td className="border border-gray-300 p-2">{email}</td>
            <td className="border border-gray-300 p-2">
              <button
                onClick={() => detailSurvey(email)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultSurveyForm;
