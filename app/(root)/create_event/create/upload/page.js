"use client";
import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import React, { useEffect, useState } from "react";
import Button from "@components/Button/Button";
import BackButton from "@components/Button/BackButton";
import { useRouter } from "@node_modules/next/navigation";
import Image from "@node_modules/next/image";
import { LuUpload } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";
import Loading from "@app/(root)/loading";

const UploadImage = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const eventId = localStorage.getItem("eventId");
    setId(eventId);
  }, []);

  const handleNext = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "ml_default");

    try {
      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dlbbfck9n/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const imageUrl = cloudinaryData.secure_url;

      // Fetch and update local storage
      const existingData = JSON.parse(localStorage.getItem("eventData")) || {};
      const updatedData = { ...existingData, imageUrl };

      localStorage.setItem("eventData", JSON.stringify(updatedData));
      console.log("Updated local storage data:", updatedData);

      router.push("/create_event/create/upload/tickets");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleBack = (event) => {
    event.preventDefault();
    router.push("/create_event/create");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);

      // Simulate loading spinner for 2000ms
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      <Header isMenu="create" />

      <div className="w-full h-full flex flex-wrap m-auto">
        <div className="w-full md:w-5/12 h-auto my-20 m-auto flex flex-col lg:flex-wrap gap-8 border-2 border-black rounded-lg">
          <form className="p-4 bg-gray-100 rounded-lg w-full h-auto flex flex-col gap-8">
            <h2 className="text-2xl font-bold text-black">Event Poster</h2>
            <ul className="flex justify-between">
              <li className="text-sm md:text-base lg:text-lg xl:text-xl">
                Basic Info
              </li>
              <li className="border-b-2 border-customPurple-default text-customPurple-default font-bold text-sm md:text-base lg:text-lg xl:text-xl">
                Upload Media
              </li>
              <li className="text-sm md:text-base lg:text-lg xl:text-xl">
                Tickets
              </li>
              <li className="text-sm md:text-base lg:text-lg xl:text-xl">
                Payment Info
              </li>
            </ul>

            {/* Upload and preview image */}
            <div className="p-4 w-full h-auto border-black border-2 border-dotted rounded-lg flex flex-col gap-4 justify-center items-center">
              {loading ? (
                <Loading /> 
              ) : selectedImage ? (
                <Image
                  src={selectedImage}
                  alt="Selected"
                  width={500}
                  height={500}
                  className="w-full h-auto max-h-64 object-cover rounded-md"
                />
              ) : (
                <CiImageOn size={50} />
              )}
              <span className="font-light text-black text-lg">
                {selectedImage ? "Image Selected" : "Select an Image"}
              </span>
              <label
                htmlFor="upload-input"
                className="flex gap-2 rounded-lg bg-customPurple-default hover:bg-customPurple-hover text-white p-2 cursor-pointer"
              >
                <LuUpload size={24} />
                Upload Media
                <input
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="w-full h-auto flex items-end justify-between">
              <BackButton onClick={handleBack} param="Back" />
              <Button onClick={handleNext} param="Save & Continue" />
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UploadImage;
