import TableHead from "./TableHead";
import TableData from "./TableRow";
export default function Table({ thName, tData, api }) {
  return (
    <div className="overflow-x-auto overflow-y-auto">
      <table className="table-xs md:table-lg text-black border-1 border-black">
        <thead>
          <tr>
            {thName.filter(name => name !== 'id').map((name, index) => (
              <TableHead key={index} name={name} />
            ))}
          </tr>
        </thead>
        <tbody>
          {tData.map((data, index) => (
            <TableData key={index} data={data} api={api} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
