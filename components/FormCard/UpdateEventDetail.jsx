"use client";
import React, { useState } from "react";
import events from "@model/eventData";
import { IoLocation } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { IoPencil } from "react-icons/io5";
import { useRouter } from "@node_modules/next/navigation";
import Button from "@components/Button/Button";

const UpdateEventDetail = ({ eventID }) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  // Find the event by ID
  const event = events.find((event) => event.id === eventID);

  // Check if the event exists
  if (!event) {
    return <div>Event not found</div>;
  }

  // Set up state for each editable field
  const [editableEvent, setEditableEvent] = useState({
    ...event,
    isEditing: false,
  });

  const handleEdit = (field) => {
    setEditableEvent((prevState) => ({
      ...prevState,
      isEditing: field,
    }));
  };

  const handleChange = (e, field) => {
    setEditableEvent((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleSave = () => {
    setEditableEvent((prevState) => ({
      ...prevState,
      isEditing: false,
    }));
    // Here you can add logic to save the updated event (e.g., to a database or local storage)
  };

  // change image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditableEvent((prevState) => ({
        ...prevState,
        newImage: imageUrl,
      }));
    }
  };

  return (
    <div className="w-full h-auto my-20 flex flex-col justify-center items-center">
      <div className="w-8/12 flex flex-col justify-center items-center gap-8">
        <div className="flex w-full items-start justify-start">
          <Button onClick={handleBack} param="Back" />
        </div>
        <div className="w-full h-full flex flex-col">
          <div className="w-auto h-[500px] overflow-hidden rounded-lg relative mb-8 z-20 shadow-gray shadow-2xl">
            <img
              src={editableEvent.newImage || editableEvent.imageEvent}
              alt={editableEvent.eventName}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4">
              <label className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer">
                Change Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-between mb-12 w-full h-full">
            <div className="flex items-center">
              <span className="text-2xl font-bold">
                {editableEvent.eventName}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-12">
            <p className="font-semibold text-lg">Type of Event</p>
            <span className="text-md font-semibold text-green-600">
              {editableEvent.typeEvent}
            </span>
          </div>

          <div className="flex flex-col gap-2 mb-12">
            <p className="font-bold text-xl">Date and Time</p>
            <div className="flex flex-wrap"> 
              {editableEvent.isEditing === "date" ? (
                <input
                  type="text"
                  value={editableEvent.date}
                  placeholder="Enter here"
                  onChange={(e) => handleChange(e, "date")}
                  className="border-2 border-black rounded-md p-2"
                />
              ) : (
                <span>{editableEvent.date}</span>
              )}
              <IoPencil
                size={20}
                onClick={() => handleEdit("date")}
                className="ml-2 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-12">
            <p className="font-bold text-xl">Location</p>
            <div className="flex gap-4">
              <IoLocation size={50} />
              {editableEvent.isEditing === "location" ? (
                <input
                  type="text"
                  value={editableEvent.location}
                  placeholder="Enter here"
                  onChange={(e) => handleChange(e, "location")}
                  className="border-2 border-black rounded-md p-2"
                />
              ) : (
                <span>{editableEvent.location}</span>
              )}
              <IoPencil
                size={20}
                onClick={() => handleEdit("location")}
                className="ml-2 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col h-full mb-12 gap-2">
            <p className="font-bold text-xl">Show Map</p>
            <div className="relative w-full h-full pb-[50%] rounded-xlx">
              <iframe
                className="absolute top-0 left-0 w-[70%] h-[100%]"
                src="https://www.google.com/maps/embed?pb=..."
                allowFullScreen
                title="Event Location"
              ></iframe>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-12">
            <p className="font-bold text-xl">About Event</p>
            {editableEvent.isEditing === "aboutEvent" ? (
              <textarea
                value={editableEvent.aboutEvent}
                placeholder="Enter here"
                onChange={(e) => handleChange(e, "aboutEvent")}
                className="border-2 border-black rounded-md p-2"
              />
            ) : (
              <p>{editableEvent.aboutEvent}</p>
            )}
            <IoPencil
              size={20}
              onClick={() => handleEdit("aboutEvent")}
              className="ml-2 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-2 mb-12">
            <p className="font-bold text-xl">Refund</p>
            {editableEvent.isEditing === "refund" ? (
              <input
                type="text"
                placeholder="Enter here"
                value={editableEvent.refund}
                onChange={(e) => handleChange(e, "refund")}
                className="border-2 border-black rounded-md p-2"
              />
            ) : (
              <p>{editableEvent.refund}</p>
            )}
            <IoPencil
              size={20}
              onClick={() => handleEdit("refund")}
              className="ml-2 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-2 mb-12">
            <p className="font-bold text-xl">Organized by</p>
            <div className="p-4 flex flex-col gap-8 bg-slate-200 rounded-lg">
              <div className="flex gap-4 items-center mb-4">
                <RxAvatar size={50} />
                {editableEvent.isEditing === "creatorName" ? (
                  <input
                    type="text"
                    placeholder="Enter here"
                    value={editableEvent.creatorName}
                    onChange={(e) => handleChange(e, "creatorName")}
                    className="border-2 border-black rounded-md p-2"
                  />
                ) : (
                  <span>{editableEvent.creatorName}</span>
                )}
                <IoPencil
                  size={20}
                  onClick={() => handleEdit("creatorName")}
                  className="ml-2 cursor-pointer"
                />
              </div>

              <div className="mb-4">
                <p>{editableEvent.creatorDescription}</p>
                <p className="font-bold text-md">Description</p>
                {editableEvent.isEditing === "description" ? (
                  <input
                    type="text"
                    placeholder="Enter here"
                    value={editableEvent.refund}
                    onChange={(e) => handleChange(e, "description")}
                    className="border-2 border-black rounded-md p-2"
                  />
                ) : (
                  <p>{editableEvent.refund}</p>
                )}
                <IoPencil
                  size={20}
                  onClick={() => handleEdit("description")}
                  className="ml-2 cursor-pointer"
                />
              </div>

              <div>
                <p className="font-bold text-xl">Contact</p>
                <span>{editableEvent.creatorContact}</span>
                {editableEvent.isEditing === "contact" ? (
                  <input
                    type="text"
                    placeholder="Enter here"
                    value={editableEvent.refund}
                    onChange={(e) => handleChange(e, "description")}
                    className="border-2 border-black rounded-md p-2"
                  />
                ) : (
                  <p>{editableEvent.refund}</p>
                )}
                <IoPencil
                  size={20}
                  onClick={() => handleEdit("contact")}
                  className="ml-2 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {editableEvent.isEditing && (
            <div className="w-full flex justify-between flex-wrap">
              <Button onClick={handleSave} param="Save Changes" />
              <Button param="Confirm" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateEventDetail;
