'use client';
import Dropdown from "@components/util/DropDown";
import StatusBar from "@components/util/StatusBar";
import Table from "@components/util/Table";
import { useEffect, useState } from "react";

export default function DashboardAdmin() {
  const thName = ["select", "name", "owner", "created", "updated", "Action"];
  const [tData, setTData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('hello world');
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setTData(jsonData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-dashboardBG flex flex-col items-center h-screen sm:ml-64 md:items-center">
      <h1 className="text-blue-500 font-semibold text-2xl mt-10 mx-0">
        Dashboard
      </h1>

      <StatusBar />
      <div className="flex flex-row space-x-64 justify-between mx-8 mt-20">
        <Dropdown />
        <input
          type="text"
          placeholder="search something"
          className="input input-bordered w-full max-w-xs bg-white border-blue-500 border-1"
        />
      </div>
      <div className=" m-auto">
      <Table thName={thName} tData={tData} api={'https://coding-fairy.com/api/mock-api-resources/1734491523/eventify'} />

      </div>
    </div>
  );
}
