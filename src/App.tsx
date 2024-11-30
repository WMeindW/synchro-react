import CreateForm from "./components/CreateForm.tsx";
import Logout from "./components/Logout.tsx";
import AttendanceForm from "./components/AttendanceForm.tsx";
import Events from "./components/Events.tsx";
import CreateUserForm from "./components/CreateUserForm.tsx";
import UserManagement from "./components/UserManagement.tsx";
import MotdFrame from "./components/MotdFrame.tsx";
import {useEffect} from "react";
import {SynchroConfig} from "./config/SynchroConfig.ts";

interface Info {
    users: [];
    shiftTypes: [];
}

export default function App() {
    async function queryOptions(): Promise<Info> {
        try {
            const response = await fetch(SynchroConfig.apiUrl + "user/query-info", {
                method: "GET"
            });
            return await response.json();
        } catch (error) {
            console.error("Error fetching users:", error);
            return {users: [], shiftTypes: []};
        }
    }

    useEffect(() => {
        queryOptions().then((response) => {
            window.localStorage.setItem("users", JSON.stringify(response.users))
            window.localStorage.setItem("shiftTypes", JSON.stringify(response.shiftTypes))
        })
    }, []);

    return (
        <>
            <div>
                <AttendanceForm/>
            </div>
            <div>
                <CreateForm/>
            </div>
            <div>
                <Events/>
            </div>
            <div>
                <CreateUserForm/>
            </div>
            <div>
                <UserManagement/>
            </div>
            <div>
                <MotdFrame/>
            </div>
            <div>
                <Logout/>
            </div>
        </>
    );
};