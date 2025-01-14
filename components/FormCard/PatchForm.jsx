"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function PatchForm({ api, id, categoryName, createdAt, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle image upload to Cloudinary
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset

    setLoading(true);
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dlbbfck9n/image/upload", // Replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImageSrc(data.secure_url); // Set the uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Fetch the existing category data
      const response = await fetch(`${api}/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch category data");
      }
      const existingData = await response.json();

      // Merge the updated fields with the existing data
      const updatedData = {
        ...existingData, // Preserve all existing fields
        name: data.name, // Update the name field
        imageSrc: imageSrc || existingData.imageSrc, // Update imageSrc if a new image is uploaded
        updatedAt: new Date().toLocaleDateString("en-GB"), // Update the updatedAt field
      };

      // Send the PUT request with the merged data
      const putResponse = await fetch(`${api}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!putResponse.ok) {
        throw new Error("Failed to update category");
      }

      setSubmitted(true);
      reset();
      onClose(); // Close the form after successful update
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <p>Category updated successfully!</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center w-auto h-fit p-12 rounded-lg">
          <div className="flex flex-col items-center">
            <label htmlFor="name" className="text-sm mb-2 text-blue-600">
              Change {categoryName} to ...
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Category is required" })}
              className="bg-white rounded-lg py-2 px-5 border-blue-600 border-[1px]"
            />
            {errors.name && (
              <p className="mt-2 mb-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col items-center mt-4">
            <label htmlFor="image" className="text-sm mb-2 text-blue-600">
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              className="bg-white rounded-lg py-2 px-5 "
            />
            {imageSrc && (
              <img
                src={imageSrc}
                alt="Uploaded"
                className="mt-2 w-20 h-20 object-cover rounded-md"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-5 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400 text-sm"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}