import TableHead from "./TableHead";
import TableData from "./TableRow";
export default function Table({ thName, tData }) {
  return (
    <div className="overflow-x-auto overflow-y-auto">
      <table className="table-xs md:table-lg text-black border-1 border-black">
        <thead>
          <tr>
            {thName.map((name, index) => (
              <TableHead key={index} name={name} />
            ))}
          </tr>
        </thead>
        <tbody>
          {tData.map((data, index) => (
            <TableData key={index} data={data} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
