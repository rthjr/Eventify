"use client";

import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import React, { useState, useEffect } from "react";
import { useRouter } from "@node_modules/next/navigation";

const Tickets = () => {
  const router = useRouter();
  const [id, setId] = useState(0);
  const [isPaid, setIsPaid] = useState(true);
  const [isFree, setIsFree] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isRefund, setIsRefund] = useState(false);
  const [noRefund, setNoRefund] = useState(false);
  const [payment, setPayment] = useState("paid");
  const [formData, setFormData] = useState({
    eventType: "Early Bird",
    limitTicket: "",
    price: "",
    ticketType: payment,
    refund: null,
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ticketType: payment }));
  }, [payment]);

  //fetch id from local storage
  useEffect(() => {
    const eventId = localStorage.getItem("eventId");
    setId(eventId);
  }, []);

  const handleStateChange = (type) => {
    setIsPaid(type === "paid");
    setIsFree(type === "free");
    setIsOpen(type === "open");
    setIsRefund(type === "refund");
    setNoRefund(type === "noRefund");
  };

  const handleBack = (event) => {
    event.preventDefault();
    router.push("/create_event/create/upload");
  };

  const handleRouter = (e) => {
    e.preventDefault();
    router.push(`/create_event/create/upload/tickets/${payment}`);
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    console.log(value);
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const existingData = JSON.parse(localStorage.getItem("eventData")) || {};
      const updatedData = { ...existingData, ...formData };
      localStorage.setItem("eventData", JSON.stringify(updatedData));
      console.log("Updated local storage data:", updatedData);
      router.push(`/create_event/create/upload/tickets/${payment}`);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <Header isMenu="create" />

      <div className="w-full h-full flex flex-wrap m-auto ">
        <div className="w-full md:w-5/12 h-auto my-20 m-auto  flex flex-col lg:flex-wrap gap-8 shadow-2xl rounded-lg">
          <div
            className="p-4 bg-gray-100  rounded-lg w-full h-auto flex flex-col gap-8"
          >
            <h2 className="text-2xl font-bold text-black">Event Poster</h2>
            <ul className="flex justify-between">
              <li className="text-sm md:text-base lg:text-lg xl:text-xl">
                Basic Info
              </li>
              <li className="text-sm md:text-base lg:text-lg xl:text-xl">
                Upload Media
              </li>
              <li className="border-b-2 border-customPurple-default text-customPurple-default text-sm md:text-base lg:text-lg xl:text-xl font-bold">
                Tickets
              </li>
              <li className="text-sm md:text-base lg:text-lg xl:text-xl">
                Payment Info
              </li>
            </ul>

            {/* ticket system */}
            <div className="w-full p-4 border-2 border-black rounded-lg flex flex-col gap-8">
              <h2 className="text-xl font-bold text-center">
                State the Event System
              </h2>

              <div className="flex justify-around w-full">
                <button
                  type="button"
                  className={`rounded-lg ${isPaid ? "bg-customPurple-hover" : "bg-customPurple-default"
                    } hover:bg-customPurple-hover text-white p-2`}
                  onClick={() => {
                    handleStateChange("paid"),
                      setPayment("paid")
                  }}
                >
                  Paid
                </button>
                <button
                  type="button"
                  className={`rounded-lg ${isFree ? "bg-customPurple-hover" : "bg-customPurple-default"
                    } hover:bg-customPurple-hover text-white p-2`}
                  onClick={() => {
                    handleStateChange("free"),
                      setPayment("free")
                  }}
                >
                  Free
                </button>
                <button
                  type="button"
                  className={`rounded-lg ${isOpen ? "bg-customPurple-hover" : "bg-customPurple-default"
                    } hover:bg-customPurple-hover text-white p-2`}
                  onClick={() => {
                    handleStateChange("open"),
                      setPayment("open")
                  }}
                >
                  Open
                </button>
              </div>

              {/* Conditional rendering */}
              {isPaid && (
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold text-start">
                    Type of event Regular, Early Bird, Last Event
                  </h2>
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                      <label htmlFor="eventType">Event Type</label>
                      <select
                        id="eventType"
                        className="p-2 border-2 border-black rounded-lg text-black"
                        onChange={handleFormChange}
                        defaultValue="Early Bird"
                      >
                        <option value="" disabled>
                          Select Event Type
                        </option>
                        <option value="Early Bird">Early Bird</option>
                        <option value="Regular">Regular</option>
                        <option value="Last">Last</option>
                      </select>
                    </div>


                    <div className="flex flex-col gap-4">
                      <label htmlFor="Amount of Attendee">
                        Amount of Attendee
                      </label>
                      <input
                        className="p-2 border-black border-2 rounded-lg text-black"
                        type="number"
                        id="limitTicket"
                        placeholder="Amount of attendee"
                        onChange={handleFormChange}
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <label htmlFor="Tickets price">Tickets Price</label>
                      <input
                        className="p-2 border-black border-2 rounded-lg text-black"
                        type="number"
                        id="price"
                        placeholder="Ticket Price"
                        onChange={handleFormChange}
                      />
                    </div>

                    <h2 className="text-xl font-bold text-start">
                      Cancellation Policy
                    </h2>

                    <p className="text-sm font-light">
                      Customize a refund policy for your event. You are
                      responsible for you own policies. In some situation,you
                      will be required to issue, regardless of your policy.
                    </p>

                    <h2 className="text-xl font-bold text-start">
                      Set your refund policy
                    </h2>

                    <div className="flex flex-col gap-8">
                      <div className="flex gap-4">
                        <input
                          type="checkbox"
                          id="refund"
                          name="policy"
                          // Use controlled input
                          checked={isRefund}
                          onChange={() => {
                            setIsRefund(true);
                            setNoRefund(false);
                            setFormData((prev) => ({ ...prev, refund: true }));
                          }}
                        />
                        <label htmlFor="refund">Allow to refund</label>
                      </div>

                      <div className="flex gap-4">
                        <input
                          type="checkbox"
                          id="noRefund"
                          name="policy"
                          // Use controlled input
                          checked={noRefund}
                          onChange={() => {
                            setIsRefund(false);
                            setNoRefund(true);
                            setFormData((prev) => ({ ...prev, refund: false }));
                          }}
                        />
                        <label htmlFor="noRefund">
                          Don&apos;t allow refund
                        </label>
                      </div>
                    </div>
                  </div>

                  {isRefund && (
                    <span>
                      24 hours after the event give be refunded is 80%.
                    </span>
                  )}

                  {noRefund && <span>Cannot be refunded.</span>}

                  <div className="w-full flex justify-between items-end">
                    <button
                      type="button"
                      onClick={() => console.log("Go Back")}
                      className="bg-gray-300 text-black py-2 px-4 rounded"
                    >
                      Back
                    </button>

                    <button className="bg-customPurple-default transition-all hover:bg-customPurple-hover text-white py-2 px-4 rounded">
                      Save & Continue
                    </button>
                  </div>
                </form>
              )}
              {isFree && (
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                      <label htmlFor="Amount of Attendee">
                        Amount of Attendee
                      </label>
                      <input
                        className="p-2 border-2 border-black rounded-lg text-black"
                        type="number"
                        placeholder="Amount of attendee"
                        id="limitTicket"
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => console.log("Go Back")}
                    className="bg-gray-300 text-black py-2 px-4 rounded"
                  >
                    Back
                  </button>

                  <button className="bg-customPurple-default transition-all hover:bg-customPurple-hover text-white py-2 px-4 rounded">
                    Save & Continue
                  </button>
                </form>
              )}
              {isOpen && (
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                  <span>Click save and continue!</span>
                  <button
                    type="button"
                    onClick={() => console.log("Go Back")}
                    className="bg-gray-300 text-black py-2 px-4 rounded"
                  >
                    Back
                  </button>

                  <button className="bg-customPurple-default transition-all hover:bg-customPurple-hover text-white py-2 px-4 rounded">
                    Save & Continue
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tickets;
