"use client";
import { useState } from "react";
import Td from "./Td";
import PatchForm from "../FormCard/PatchForm";
import { createPortal } from "react-dom"; // Import createPortal

export default function TableRow({
  index,
  data,
  api,
  detailSurvey,
  hideDescription,
  hideUpdate,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleEdit = () => {
    console.log("Edit button clicked");
    setIsEditMode(true);
  };

  const handleRemove = async () => {
    try {
      const response = await fetch(`${api}/${data.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Item removed successfully");
      } else {
        console.error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Function to handle rendering of object values
  const renderValue = (value) => {
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value); // Convert object to string
    }
    return value; // Return primitive values as is
  };

  return (
    <>
      {/* Table Row */}
      <tr index={index}>
        <th>
          <label>
            <input
              type="checkbox"
              className="checkbox text-black border-black"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </label>
        </th>
        {Object.keys(data).map((key, index) => {
          if (
            (hideDescription === "yes" && key === "description") ||
            key === "createAt" ||
            key === "location" ||
            key === "imageUrl" ||
            key === "qrUrl" ||
            key === "isCash" ||
            key === "registerEmail" ||
            key === "isEditing" ||
            key === "surveyResponse"
          ) {
            return null;
          }

          const value = data[key];
          const displayValue = renderValue(value); // Use the renderValue function

          return <Td key={index} name={displayValue} />;
        })}

        {detailSurvey === "yes" ? (
          <>
            <td colSpan="2">
              <button className="btn btn-primary py-1">View</button>
            </td>
          </>
        ) : (
          <>
            <td>
              <button
                onClick={handleRemove}
                className="btn btn-danger py-1"
                disabled={!isChecked}
              >
                Remove
              </button>
            </td>
            {hideUpdate !== "yes" && (
              <td>
                <button
                  onClick={handleEdit}
                  className="btn btn-danger py-1 bg-blue-500 hover:bg-blue-400 text-white"
                  disabled={!isChecked}
                >
                  Update
                </button>
              </td>
            )}
          </>
        )}
      </tr>

      {/* Modal for Editing */}
      {isEditMode &&
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-black hover:text-red-500"
                onClick={() => setIsEditMode(false)}
              >
                ✕
              </button>
              <PatchForm
                api={api}
                id={data.id}
                categoryName={data.name}
                createdAt={data.createdAt}
                onClose={() => setIsEditMode(false)}
              />
            </div>
          </div>,
          document.body // Render the modal in the body
        )}
    </>
  );
}