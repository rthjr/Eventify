"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function CategoryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${currentDate.getFullYear()}`;

    const imageFile = data.imageSrc[0]; // Get the uploaded file
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dlbbfck9n/image/upload",
        {
          // Replace with your Cloudinary cloud name
          method: "POST",
          body: formData,
        }
      );

      const uploadResult = await res.json();
      const imageUrl = uploadResult.secure_url; // The uploaded image URL from Cloudinary

      // Submit the form with the imageSrc field
      const categoryResponse = await fetch(
        "https://coding-fairy.com/api/mock-api-resources/1734491523/category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            imageSrc: imageUrl,
            createdAt: formattedDate,
            updatedAt: formattedDate,
          }),
        }
      );

      const category = await categoryResponse.json();
      setCategories((prevCategories) => [
        ...prevCategories,
        { ...category, createdAt: formattedDate, updatedAt: formattedDate },
      ]);

      setSubmitted(true);
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (submitted) {
    return <p>Category added successfully!</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center w-auto h-fit p-12 rounded-lg">
          <div className="flex flex-col items-center">
            <label htmlFor="name" className="text-sm mb-2 text-blue-600">
              Category Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Category name is required" })}
              className="bg-white rounded-lg py-2 px-5 border-blue-600 border-[1px]"
            />
            {errors.name && (
              <p className="mt-2 mb-2 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center mt-4">
            <label htmlFor="imageSrc" className="text-sm mb-2 text-blue-600">
              Upload Image
            </label>
            <input
              id="imageSrc"
              type="file"
              accept="image/*"
              {...register("imageSrc", { required: "Image is required" })}
              className="bg-white rounded-lg py-2 px-5 border-blue-600 border-[1px]"
              onChange={(e) =>
                setImagePreview(URL.createObjectURL(e.target.files[0]))
              }
            />
            {errors.imageSrc && (
              <p className="mt-2 mb-2 text-sm text-red-600">
                {errors.imageSrc.message}
              </p>
            )}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded-lg"
              />
            )}
          </div>

          <button
            type="submit"
            className="mt-5 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400 text-sm"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
