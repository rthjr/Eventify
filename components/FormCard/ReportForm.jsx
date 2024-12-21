
"use client"
import BackButton from "@components/Button/BackButton";
import Button from "@components/Button/Button";
import React from "react";
import { useRouter } from "@node_modules/next/navigation";

const ReportForm = ({onClick, pageEvent}) => {
  const router = useRouter();
  const handleRouteBack = (e) => {
    e.preventDefault();
    router.push(`/${pageEvent}`);
  };
  return (
    <div className="flex flex-col gap-8 w-10/12 h-auto m-auto p-2 shadow-xl rounded-lg bg-gray-200">
      <h2 className="text-center text-2xl font-bold">Report This Event</h2>

      <p className="text-lg font-light">
        Please help Eventify investigate this event by providing information
        about why you're reporting it.
      </p>

      <span className="text-xl font-bold text-start">Reason For Report</span>

      <form className="flex flex-col gap-8" action="">
        <div className="flex flex-wrap gap-4">
          <input type="checkbox" />
          <label htmlFor="">Fraudulent Event Listing or Scams</label>
        </div>

        <div className="flex flex-wrap gap-4">
          <input type="checkbox" />
          <label htmlFor="">Harmful Content</label>
        </div>

        <div className="flex flex-wrap gap-4">
          <input type="checkbox" />
          <label htmlFor="">Regulated Content or Activities</label>
        </div>

        <div className="flex flex-wrap gap-4">
          <input type="checkbox" />
          <label htmlFor="">Spam</label>
        </div>

        <div className="flex flex-wrap gap-4">
          <input type="checkbox" />
          <label htmlFor="">Sexually Explicit Content</label>
        </div>

        <div className="flex flex-wrap gap-4">
          <input type="checkbox" />
          <label htmlFor="">Hateful Content</label>
        </div>

        <div className="flex flex-wrap gap-4">
          <input type="checkbox" />
          <label htmlFor="">Violence or Extemism</label>
        </div>

        <div className="flex flex-wrap gap-4">
          <input type="checkbox" />
          <label htmlFor="">Canceled Event</label>
        </div>

        <div className="flex flex-wrap gap-4">
          <input type="checkbox" />
          <label htmlFor="">Required a Refund</label>
        </div>

        <div className="flex flex-wrap gap-4">
          <input type="checkbox" />
          <label htmlFor="">Copyright or Trademark Infringement</label>
        </div>

        <div className="flex flex-col border-2 border-black rounded-lg gap-4 p-2">
          <label htmlFor="">Your Email</label>
          <input
            type="email"
            className="border-none focus:outline-none"
            placeholder="Ex: name@gmail.com"
          />
        </div>

        <div className="flex flex-col border-2 border-black rounded-lg gap-4 p-2">
          <label htmlFor="">Other Reason</label>
          <textarea
            className="focus:outline-none"
            placeholder="Type Here..."
          ></textarea>
        </div>

        <div className="w-full h-auto flex justify-between">
          <BackButton
            param = "Go Back"
            onClick={onClick}
          />
          <Button
            param = "Submit Report"
            onClick={handleRouteBack}
          />
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
