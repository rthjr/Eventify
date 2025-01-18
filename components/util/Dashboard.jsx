"use client";
import Dropdown from "@components/util/DropDown";
import StatusBar from "@components/util/StatusBar";
import Table from "@components/util/Table";
import { useEffect, useState } from "react";
import LoadingPage from "./Loading";
export default function DashboardAdmin() {
  const thName = [
    "Select",
    "Name",
    "Date",
    "Start Time",
    "End Time",
    "Category",
    "Creator",
    "createAt",
    "Event Type",
    "Limit Ticket",
    "Price",
    "Ticket Type",
    "ID",
    "Remove",
  ];
  const [tData, setTData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOrder, setFilterOrder] = useState(null);

  const fetchData = async () => {
    try {
      console.log("hello world");
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();

      setTData(jsonData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingPage />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Apply search and filter logic
  let filterEventify = tData.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filterOrder) {
    filterEventify.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return filterOrder === "ascending" ? dateA - dateB : dateB - dateA;
    });
  }
  return (
    <div className="min-h-screen w-full justify-center items-center">
      <div className="flex flex-col items-center h-full w-full  md:items-center gap-8">
        <h1 className="text-blue-500 font-semibold text-2xl mt-10 mx-0">
          Dashboard
        </h1>

        <StatusBar />
        <div className="w-10/12  flex flex-col gap-8">
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
            <Table
              thName={thName}
              tData={filterEventify}
              api={
                "https://coding-fairy.com/api/mock-api-resources/1734491523/eventify"
              }
              hideDescription="yes"
              hideUpdate="yes"
              refreshData={fetchData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
