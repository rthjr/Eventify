import Td from "./Td";
export default function TableRow({ index , data }) {
  return (
    <tr index={index}  >
      <th>
        <label>
          <input type="checkbox" className="checkbox text-black border-black" />
        </label>
      </th>
      {
        Object.keys(data).map((key, index) => (
          <Td key={index} name={data[key]} />
        ))
      }
    </tr>
  );
}
