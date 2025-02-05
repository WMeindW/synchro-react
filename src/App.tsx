import CreateForm from "./components/CreateForm.tsx";
import Logout from "./components/Logout.tsx";
import AttendanceForm from "./components/AttendanceForm.tsx";
import Events from "./components/Events.tsx";
import CreateUserForm from "./components/CreateUserForm.tsx";
import UserManagement from "./components/UserManagement.tsx";
import MotdFrame from "./components/MotdFrame.tsx";
import {useEffect, useState} from "react";
import {SynchroConfig} from "./config/SynchroConfig.ts";
import BarChartDemo from "./components/BarChart.tsx";
import {Client} from "./service/Client.ts";
import Dialog from "./components/Dialog.tsx";

interface Info {
    users: [];
    shiftTypes: [];
    userTypes: [];
}

export default function App() {
    const [dashboard, setDashboard] = useState(<div className={"loading"}>Loading...</div>);

    async function queryOptions(): Promise<Info> {
        try {
            const response = await fetch(SynchroConfig.apiUrl + "user/query-info", {
                method: "GET"
            });
            return await response.json();
        } catch (error) {
            console.error("Error fetching users:", error);
            return {
                userTypes: JSON.parse(localStorage.getItem("userTypes") as string),
                users: JSON.parse(localStorage.getItem("users") as string),
                shiftTypes: JSON.parse(localStorage.getItem("shiftTypes") as string)
            };
        }
    }

    let stuff = <>
        <div>
            <div className="container">
                <CreateUserForm/>
            </div>
            <div className="container">
                <UserManagement/>
            </div>
            <div className="container">
                <MotdFrame/>
            </div>
            <div className="container">
                <Logout/>
            </div>
            <div className="container">
                <BarChartDemo/>
            </div>
        </div>
    </>
    useEffect(() => {
        console.log("Fetching info...")
        queryOptions().then((response) => {
            window.localStorage.setItem("users", JSON.stringify(response.users))
            window.localStorage.setItem("shiftTypes", JSON.stringify(response.shiftTypes))
            window.localStorage.setItem("userTypes", JSON.stringify(response.userTypes))
        }).then(() => {
            setDashboard(<div>
                <Dialog ref={Client.dialog}></Dialog>
                <div className="container">
                    <AttendanceForm/>
                </div>
                <div className="container">
                    <CreateForm/>
                </div>
                <div className="container">
                    <Events/>
                </div>
            </div>)
        })
    }, []);

    return (
        <>
            {dashboard}
        </>
    );
};