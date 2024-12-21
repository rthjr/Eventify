export default function Table({ param }) {
  // condition for dash board in create event
  const isDashboard = param === "dashboardCreateEvent";

  return (
    <div className="overflow-x-auto overflow-y-auto">
      <table className="table-xs md:table-lg text-black border-1 border-black">
        {/* Table Head */}
        <thead>
          <tr>
            {/* condition for dash board in create event */}
            <th>{isDashboard ? "ID" : ""}</th>
            <th>Event Name</th>
            <th>Created</th>
            {!isDashboard && (
              <>
                <th>Owner</th>
                <th>Category</th>
                <th>Event Type</th>
              </>
            )}
            {isDashboard && (
              <>
                <th>Start Event</th>
                <th>End Event</th>
                <th>Registration</th>
              </>
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          <tr>
            {/* condition for dash board in create event */}
            <th>
              {!isDashboard ? (
                <label>
                  <input
                    type="checkbox"
                    className="checkbox text-black border-black"
                  />
                </label>
              ) : (
                // where ID display in create_event dashboard
                "1"
              )}
            </th>
            {/* Event Name and Details */}
            <td>
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>

            {/* Created Information */}
            <td>Zemlak, Daniel and Leannon</td>

            {/* condition for dash board in create event */}
            {!isDashboard && <td>Purple</td>}
            {isDashboard && (
              <>
                <td>12:30</td>
                <td>5:30</td>
                <td>50</td>
              </>
            )}

            {/* Actions */}
            {!isDashboard && (
              <>
                <td>
                  <button className="btn btn-ghost btn-xs">Details</button>
                </td>
                <td>
                  <button className="btn btn-ghost btn-xs">Stupid</button>
                </td>
              </>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
