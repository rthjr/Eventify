"use client";
import { useState } from "react";
import Td from "./Td";
import PatchForm from "../FormCard/PatchForm";

export default function TableRow({ index, data, api }) {
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

  return (
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
      {Object.keys(data).map((key, index) => (
        <Td key={index} name={data[key]} />
      ))}
      <td>
        <button
          onClick={handleRemove}
          className="btn btn-danger py-1"
          disabled={!isChecked}
        >
          Remove
        </button>
      </td>
      <td>
        <button
          onClick={handleEdit}
          className="btn btn-danger py-1 bg-blue-500 hover:bg-blue-400 text-white"
          disabled={!isChecked}
        >
          Update
        </button>
      </td>
      {isEditMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-black hover:text-red-500"
              onClick={() => setIsEditMode(false)}
            >
              ✕
            </button>

            {api ===
              "https://coding-fairy.com/api/mock-api-resources/1734491523/eventify" && (
              <PatchForm
                api={api}
                id={data.id}
                categoryName={data.name}
                createdAt={data.createdAt}
              />
            )}

            {api ===
              "https://coding-fairy.com/api/mock-api-resources/1734491523/category" && (
              <PatchForm
                api={api}
                id={data.id}
                categoryName={data.name}
                createdAt={data.createdAt}
              />
            )}

            {api ===
              "https://coding-fairy.com/api/mock-api-resources/1734491523/category" && (
              <PatchForm
                api={api}
                id={data.id}
                categoryName={data.name}
                createdAt={data.createdAt}
              />
            )}
          </div>
        </div>
      )}
    </tr>
  );
}
