"use client";
import Table from "./Table";
import Dropdown from "./DropDown";
import { useEffect, useState } from "react";
import CategoryForm from "@components/FormCard/CategoryForm";

export default function Category() {
  const [click, setClick] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOrder, setFilterOrder] = useState(null);
  const thName = [
    "select",
    "Category Name",
    "Created At",
    "End At",
    "Id",
    "Remove",
    "Updated",
  ];
  const api =
    "https://coding-fairy.com/api/mock-api-resources/1734491523/category";

  async function fetchData() {
    try {
      const res = await fetch(api);
      const category = await res.json();

      // exclude imageSrc
      const filteredCategories = category.map(({ imageSrc, ...rest }) => rest);
      setCategories(filteredCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Apply search and filter logic
  let filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filterOrder) {
    filteredCategories.sort((a, b) => {
      const dateA = new Date(a.createdAt.split("/").reverse().join("-"));
      const dateB = new Date(b.createdAt.split("/").reverse().join("-"));
      return filterOrder === "ascending" ? dateA - dateB : dateB - dateA;
    });
  }

  return (
    <div className="flex w-full justify-center items-center bg-white min-h-screen">
      <div className="flex flex-col items-center h-full md:items-center gap-8">
        <h1 className="text-blue-500 font-semibold text-2xl mt-10 mx-0">
          Category
        </h1>
        <div className="w-full">
          <button
            className="flex w-fit justify-start text-black hover:text-blue-500"
            onClick={() => setClick(true)}
          >
            + new category
          </button>
        </div>
        <div className="flex w-full justify-between">
          <Dropdown onFilterChange={setFilterOrder} />
          <input
            type="text"
            placeholder="search something"
            className="input input-bordered w-full max-w-xs bg-white border-blue-500 border-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Table thName={thName} tData={filteredCategories} refreshData={fetchData} api={api} />
        </div>
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
    </div>
  );
}
