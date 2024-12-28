import Table from "@components/util/Table";
import React from "react";

export const ResultSurveyForm = ({ detailSurvey }) => {
  const thName = ["select", "email", "response"];
  const tData = [
    {
      email: "example@gmail.com",
      response: "Zemlak, Daniel and Leannon",
    },
    {
      email: "example@gmail.com",
      response: "Zemlak, Daniel and Leannon",
    },
    {
      email: "example@gmail.com",
      response: "Zemlak, Daniel and Leannon",
    },
    {
      email: "example@gmail.com",
      response: "Zemlak, Daniel and Leannon",
    },
    {
      email: "example@gmail.com",
      response: "Zemlak, Daniel and Leannon",
    },
  ];

  return <Table thName={thName} tData={tData} detailSurvey={detailSurvey} />;
};
