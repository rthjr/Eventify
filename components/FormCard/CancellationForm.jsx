"use client";

import BackButton from "@components/Button/BackButton";
import Button from "@components/Button/Button";
import React from "react";
import { useRouter } from "@node_modules/next/navigation";

const CancellationForm = ({ onClick, pageEvent }) => {
  const router = useRouter();
  const handleRouteBack = (e) => {
    e.preventDefault();
    router.push(`/${pageEvent}`);
  };
  return (
    <div className="w-full h-full ">
      <div className="m-auto w-full h-fit lg:w-1/4 lg:h-fit flex flex-col gap-8 shadow-xl bg-gray-200 p-4 rounded-lg">
        <h2 className="font-bold text-xl text-center">Cancellation Ticket</h2>

        <div className="flex flex-col gap-8">
          <span className="font-bold text-lg">Policy</span>
          <p>
            A refund can be issued within 24 hours after the ticket booking
            process is completed, with 80% of the amount refunded.
          </p>
          <u>After 24 hours, a refund cannot be processed.</u>

          <dir className="w-full flex justify-between">
            <BackButton param="Go Back" onClick={onClick} />

            <Button param="Refund" onClick={handleRouteBack} />
          </dir>
        </div>
      </div>
    </div>
  );
};

export default CancellationForm;
