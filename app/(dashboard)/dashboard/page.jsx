import Dashboard from "@components/pages/CreateEvent/Dashboard";
import Category from "@components/util/Category";
import DashboardAdmin from "@components/util/Dashboard";
import Dropdown from "@components/util/DropDown";
import StatusBar from "@components/util/StatusBar";
import Table from "@components/util/Table";

export default function DashBoard() {
    return(
        <div>
            <DashboardAdmin/>
            <Category/>
        </div>
    )
}