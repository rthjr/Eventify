import { CiImageOn } from "@node_modules/react-icons/ci"
import { LuUpload } from "@node_modules/react-icons/lu"
import BackButton from "@components/Button/BackButton"
import Button from "@components/Button/Button"
export default function UploadImage(){
    return(
        <div className="w-full h-full flex flex-wrap m-auto ">
        <div className="w-5/12 h-auto my-20 m-auto  flex flex-col lg:flex-wrap gap-8 border-2 border-black rounded-lg">
            <form className="p-4 bg-gray-100 rounded-lg w-full h-auto flex flex-col gap-8">
                <h2 className="text-2xl font-bold text-black">Event Poster</h2>
                <ul className="flex justify-between">
                    <li className="text-sm md:text-base lg:text-lg xl:text-xl">Basic Info</li>
                    <li className="border-b-2 border-customPurple-default text-customPurple-default font-bold text-sm md:text-base lg:text-lg xl:text-xl">
                        Upload Media
                    </li>
                    <li className="text-sm md:text-base lg:text-lg xl:text-xl">Tickets</li>
                    <li className="text-sm md:text-base lg:text-lg xl:text-xl">Payment Info</li>
                </ul>

                {/* Upload and preview image */}
                <div className="p-4 w-full h-auto border-black border-2 border-dotted rounded-lg flex flex-col gap-4 justify-center items-center">
                    {selectedImage ? (
                        <img
                            src={selectedImage}
                            alt="Selected"
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
    )
}