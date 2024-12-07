import Table from "./Table";
import Dropdown from "./DropDown";
export default function Category() {
  return (
    <div className="bg-dashboardBG flex flex-col items-center h-screen  md:ml-64 md:items-center ">
      <h1 className="text-blue-500  font-semibold text-2xl mt-10 mx-0">
        Category
      </h1>
      <button className="self-start ml-64 mt-10  text-black hover:text-blue-500">
        + new category
      </button>
      <div className="flex flex-row space-x-64 justify-between mx-8 mt-20">
        <Dropdown />

        <input
          type="text"
          placeholder="search something"
          className="input input-bordered w-full max-w-xs bg-white border-blue-500 border-1 "
        />
      </div>
      <Table />
    </div>
  );
}
