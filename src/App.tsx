import {useEffect, useState} from "react";
import {SynchroConfig} from "./config/SynchroConfig.ts";
import {Client} from "./service/Client.ts";
import Dialog from "./components/Dialog.tsx";
import Router from "./Router.tsx";

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
            const res = await response;
            if (res.status != 200)
                return {users: [], shiftTypes: [], userTypes: []}
            return res.json();
        } catch (error) {
            console.error("Error fetching users:", error);
            return {users: [], shiftTypes: [], userTypes: []}
        }
    }

    useEffect(() => {
        console.log("Fetching info...")
        queryOptions().then((response) => {
            window.localStorage.setItem("users", JSON.stringify(response.users))
            window.localStorage.setItem("shiftTypes", JSON.stringify(response.shiftTypes))
            window.localStorage.setItem("userTypes", JSON.stringify(response.userTypes))
        }).then(() => {
            setDashboard(<div className={"body"}>
                <Dialog ref={Client.dialog}></Dialog>
                <Router/>
            </div>)
        })
    }, []);

    return (
        <>
            {dashboard}
        </>
    );
};