import React from "react";

const Dashboard = () => {
  return (
    <div className="font-bold text-lg flex flex-col p-4 gap-8">
      <h2 className="text-2xl">Dashboard</h2>

      <div className="flex flex-wrap gap-4 lg:justify-between">
        <div className="flex flex-col justify-center items-center p-4 w-52 h-52 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-7xl">10</h2>
          <span className="font-light">My Total Event</span>
        </div>

        <div className="flex flex-col justify-center items-center p-4 w-52 h-52 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-7xl">35</h2>
          <span className="font-light">Total Purchase</span>
        </div>

        <div className="flex flex-col justify-center items-center p-4 w-52 h-52 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-7xl">5</h2>
          <span className="font-light">Up Coming Event</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
