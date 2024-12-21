export default function Table({ categories, name }) {
  console.log(categories);
  return (
    <div className="overflow-x-auto overflow-y-auto ">
      <table className=" table-xs md:table-lg text-black border-1 border-black">
        {/* head */}
        <thead>
          <tr>
          <th></th>
            <th>{name}</th>
            <th>Created</th>
            <th>Owner</th>
            <th>Category</th>
            <th>Event Type</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox text-black border-black" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-bold"></div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Placeholder Name
              <br />
            
            </td>
            <td>Purple</td>
            <td>
              <button className="btn btn-ghost btn-xs">details</button>
            </td>
            <td>
              <button className="btn btn-ghost btn-xs">Stupid</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
