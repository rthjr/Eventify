"use client"

import TableHead from "./TableHead";
import TableData from "./TableRow";
import { useState } from "react";
export default function Table({ thName, tData, api, selectAll, detailSurvey }) {
  const [selectedAll, setSelectedAll] = useState(false);

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll);
  };
  return (
    <div className="overflow-x-auto overflow-y-auto">
      {selectAll === "yes" && (
        <button
          onClick={handleSelectAll}
          className="mb-2 p-2 bg-blue-500 text-white rounded"
        >
          {selectedAll ? "Cancel All" : "Select All"}
        </button>
      )}
      <table className="table-xs md:table-lg text-black ">
        <thead>
          <tr>
            {thName
              .filter((name) => name !== "id")
              .map((name, index) => (
                <TableHead key={index} name={name} />
              ))}
          </tr>
        </thead>
        <tbody>
          {tData.map((data, index) => (
            <TableData key={index} data={data} api={api} detailSurvey={detailSurvey}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}
