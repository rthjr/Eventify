'use client';
import Table from "./Table";
import Dropdown from "./DropDown";
import { useState } from "react";
import CategoryForm from "@components/FormCard/CategoryForm";

export default function Category() {
  const [click, setClick] = useState(false);

  return (
    <div className="bg-dashboardBG flex flex-col items-center h-screen md:ml-64 md:items-center relative">
      <h1 className="text-blue-500 font-semibold text-2xl mt-10 mx-0">
        Category
      </h1>
      <button
        className="self-start ml-64 mt-10 text-black hover:text-blue-500"
        onClick={() => setClick(true)}
      >
        + new category
      </button>
      <div className="flex flex-row space-x-64 justify-between mx-8 mt-20">
        <Dropdown />
        <input
          type="text"
          placeholder="search something"
          className="input input-bordered w-full max-w-xs bg-white border-blue-500 border-1"
        />
      </div>
      <Table />
      {click && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-black hover:text-red-500"
              onClick={() => setClick(false)}
            >
              ✕
            </button>
            <CategoryForm />
          </div>
        </div>
      )}
    </div>
  );
}
