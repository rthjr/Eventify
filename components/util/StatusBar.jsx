"use client";
import { NextResponse } from "@node_modules/next/server";
import { useState, useEffect } from "react";

function StatCard({ title, value, icon }) {
  return (
    <div className="stat border-blue-500 border rounded-lg text-black h-full">
      <div className="stat-figure text-black">{icon}</div>
      <div className="stat-title text-black opacity-90">{title}</div>
      <div className="stat-value text-black opacity-90">{value}</div>
    </div>
  );
}

export default function StatusBar() {
  const [eventsData, setEventsData] = useState({
    totalUsers: 0,
    totalCreators: 0,
    totalEvents: 0,
  });

  useEffect(() => {
    let intervalId;
    async function fetchData() {
        try {
            const response = await fetch("https://coding-fairy.com/api/mock-api-resources/1734491523/eventify", {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error("Cannot fetch from API");
            }

            const result = await response.json();


            const totalEvents = result.length;
            const allEmailUsers = new Set();
            const allCreators = new Set();

            result.forEach((event) => {
                event.registerEmail.forEach((email) => allEmailUsers.add(email));
                allCreators.add(event.owner);
            });
            setEventsData({
                totalUsers: allEmailUsers.size,
                totalCreators: allCreators.size,
                totalEvents,
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    fetchData();
    intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
}, []); 


  console.log(eventsData)

  const stats = [
    {
      title: "Total Users",
      value: eventsData.totalUsers || 0,
      icon: (
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
          className="icon icon-tabler icon-tabler-users"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
          <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
        </svg>
      ),
    },
    {
      title: "Total Creators",
      value: eventsData.totalCreators || 0,
      icon: (
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
          className="icon icon-tabler icon-tabler-user-check"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
          <path d="M15 19l2 2l4 -4" />
        </svg>
      ),
    },
    {
      title: "Total Events",
      value: eventsData.totalEvents || 0,
      icon: (
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
      ),
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:w-fit stat">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
