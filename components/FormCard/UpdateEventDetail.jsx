"use client";

import React, { useState, useEffect } from "react";
import { IoPencil } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Button from "@components/Button/Button";
import { useRouter } from "@node_modules/next/router";

const UpdateEventDetail = ({ eventID }) => {
  const [editableEvent, setEditableEvent] = useState(null);
  const [originalEvent, setOriginalEvent] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const eventIDNumber = Number(eventID);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://coding-fairy.com/api/mock-api-resources/1734491523/eventify"
        );
        const result = await response.json();
        const event = result.find((event) => event.id === eventID);

        if (event) {
          setEditableEvent({ ...event, isEditing: null });
          setOriginalEvent(event); // Keep the original copy for comparison
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [eventID]);

  if (!editableEvent) {
    return <div>Loading event details...</div>;
  }

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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dlbbfck9n/image/upload",
          { method: "POST", body: formData }
        );
        const data = await response.json();
        if (data.secure_url) {
          setEditableEvent((prevState) => ({
            ...prevState,
            newImage: data.secure_url,
          }));
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Create an object to hold only the modified fields
    const modifiedFields = {};
    for (const key in editableEvent) {
      if (editableEvent[key] !== originalEvent[key]) {
        modifiedFields[key] = editableEvent[key];
      }
    }

    // Merge the modified fields with the original event data
    const updatedEvent = { ...originalEvent, ...modifiedFields };

    try {
      const response = await fetch(
        `https://coding-fairy.com/api/mock-api-resources/1734491523/eventify/${eventIDNumber}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (response.ok) {
        console.log("Event updated successfully!");
        // Update originalEvent with the latest saved state
        setOriginalEvent(updatedEvent);
        // Reset the editableEvent to reflect the new changes
        setEditableEvent(updatedEvent); 
        // Navigate to the /finish page after a successful update
        const router = useRouter();
        router.push("/finish");
      } else {
        const errorData = await response.json();
        console.error("Failed to update event:", errorData);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setEditableEvent((prevState) => ({ ...prevState, isEditing: null }));
      setIsSaving(false);
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
              src={editableEvent.imageUrl || editableEvent.imageUrl}
              alt={editableEvent.name}
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

          <div className="flex flex-col gap-8">
            <h1 className="text-2xl font-bold">{editableEvent.name}</h1>
            <div>
              <p className="font-bold text-xl">Date</p>
              {editableEvent.isEditing === "date" ? (
                <input
                  type="date"
                  value={editableEvent.date}
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

            <div>
              <p className="font-bold text-xl">Start Time</p>
              {editableEvent.isEditing === "startTime" ? (
                <input
                  type="time"
                  value={editableEvent.startTime}
                  onChange={(e) => handleChange(e, "startTime")}
                  className="border-2 border-black rounded-md p-2"
                />
              ) : (
                <span>{editableEvent.startTime}</span>
              )}
              <IoPencil
                size={20}
                onClick={() => handleEdit("startTime")}
                className="ml-2 cursor-pointer"
              />
            </div>

            <div>
              <p className="font-bold text-xl">End Time</p>
              {editableEvent.isEditing === "endTime" ? (
                <input
                  type="time"
                  value={editableEvent.endTime}
                  onChange={(e) => handleChange(e, "endTime")}
                  className="border-2 border-black rounded-md p-2"
                />
              ) : (
                <span>{editableEvent.endTime}</span>
              )}
              <IoPencil
                size={20}
                onClick={() => handleEdit("endTime")}
                className="ml-2 cursor-pointer"
              />
            </div>

            <div>
              <p className="font-bold text-xl">Location</p>
              {editableEvent.isEditing === "location" ? (
                <input
                  type="text"
                  value={editableEvent.location}
                  onChange={(e) => handleChange(e, "location")}
                  className="border-2 border-black rounded-md p-2 w-full"
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

            <div>
              <p className="font-bold text-xl">Limit Ticket</p>
              {editableEvent.isEditing === "limitTicket" ? (
                <input
                  type="text"
                  value={editableEvent.limitTicket}
                  onChange={(e) => handleChange(e, "limitTicket")}
                  className="border-2 border-black rounded-md p-2 w-full"
                />
              ) : (
                <span>{editableEvent.limitTicket}</span>
              )}
              <IoPencil
                size={20}
                onClick={() => handleEdit("limitTicket")}
                className="ml-2 cursor-pointer"
              />
            </div>

            <div>
              <p className="font-bold text-xl">Description</p>
              {editableEvent.isEditing === "description" ? (
                <textarea
                  value={editableEvent.description}
                  onChange={(e) => handleChange(e, "description")}
                  className="border-2 border-black rounded-md p-2 w-full"
                />
              ) : (
                <span>{editableEvent.description}</span>
              )}
              <IoPencil
                size={20}
                onClick={() => handleEdit("description")}
                className="ml-2 cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button
              onClick={handleSave}
              param={isSaving ? "Saving..." : "Save Changes"}
              disabled={isSaving}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEventDetail;
