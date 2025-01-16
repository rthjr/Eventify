"use client";
import SurveyModel from "@components/util/OpenSurveyModel";
import { useState, useEffect } from "react";

const ResultSurveyForm = ({ eventIdNumber }) => {
  const [respond, setRespond] = useState([]);
  console.log(eventIdNumber)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://coding-fairy.com/api/mock-api-resources/1734491523/surveydata"
        );
        const result = await response.json();
        const surveyData = result.filter((data) => data.eventID === eventIdNumber);
        setRespond(surveyData)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [eventIdNumber]);
  return (
    <div className="flex flex-col space-y-2 ">
      {respond.map((survey, index) => (
        <SurveyModel key={index} sender={survey.sender} feedback={survey.feedback} />
      ))}
    </div>
  )
};

export default ResultSurveyForm;
