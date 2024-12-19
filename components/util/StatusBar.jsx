'use client'
import { useState, useEffect } from "react";
export default function StatusBar() {

      const [eventsData, setEventsData] = useState([])
      
      useEffect(() => {
          async function fetchData() {
            try {
              const response = await fetch('https://coding-fairy.com/api/mock-api-resources/1734491523/events');
              const result = await response.json();
              setEventsData(result);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
      
          fetchData();
        }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:w-fit stat ">
      <div className="stat border-blue-500 border rounded-lg text-black h-full">
        <div className="stat-figure text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-users"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
          </svg>
        </div>
        <div className="stat-title text-black opacity-90">Total Users</div>
        <div className="stat-value text-black opacity-90">{eventsData[0].totalUsers}</div>
      </div>

      <div className="stat border-blue-500 border rounded-lg text-black h-full">
        <div className="stat-figure text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-user-check"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
            <path d="M15 19l2 2l4 -4" />
          </svg>
        </div>
        <div className="stat-title text-black opacity-90">Total Creators</div>
        <div className="stat-value text-black opacity-90">{eventsData[0].totalCreators}</div>
      </div>

      <div className="stat border-blue-500 border rounded-lg text-black h-full">
        <div className="stat-figure text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            ></path>
          </svg>
        </div>
        <div className="stat-title text-black opacity-90">Total Events</div>
        <div className="stat-value text-black opacity-90">{eventsData[0].totalEvents}</div>
      </div>
    </div>
  );
}
