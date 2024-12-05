import BackButton from "@components/Button/BackButton";
import Button from "@components/Button/Button";
import React from "react";

const FeedBack = () => {
  return (
    <form className="w-10/12 h-auto p-2 flex flex-col gap-8">
      <h2 className="text-center text-black font-bold text-2xl">
        Help us improve
      </h2>
      <div className="w-full flex flex-wrap justify-around">
        <div className="flex flex-col gap-4 justify-center items-center">
          <label htmlFor="veryGood">Very Good</label>
          <input type="radio" />
        </div>

        <div className="flex flex-col gap-4 justify-center items-center">
          <label htmlFor="veryGood">Good</label>
          <input type="radio" />
        </div>

        <div className="flex flex-col gap-4 justify-center items-center">
          <label htmlFor="veryGood">Poor</label>
          <input type="radio" />
        </div>

        <div className="flex flex-col gap-4 justify-center items-center">
          <label htmlFor="veryGood">Very Poor</label>
          <input type="radio" />
        </div>
      </div>

      <span className="text-lg font-light">
        Is there anything else you’d like to share about your experience?
      </span>

      <textarea name="" placeholder="Description" id=""></textarea>

      <div className="w-full flex flex-wrap justify-between">
        <Button
          param = "Feedback"
        />
        <BackButton
          backParam = "Go Back"
        />
      </div>
    </form>
  );
};

export default FeedBack;
