import Dropdown from "@components/util/DropDown";
import StatusBar from "@components/util/StatusBar";
import Table from "@components/util/Table";

export default function DashboardAdmin() {
    return(
        <div className="bg-dashboardBG flex flex-col items-center h-screen  sm:ml-64 md:items-center ">
            <h1 className="text-blue-500  font-semibold text-2xl mt-10 mx-0">
                Dashboard
            </h1>

            <StatusBar/>
            <div className="flex flex-row space-x-64 justify-between mx-8 mt-20">
            <Dropdown/>
            
            <input type="text" placeholder="search something" className="input input-bordered w-full max-w-xs bg-white border-blue-500 border-1 " />
            </div>
            <Table/>
        </div>
    )
}