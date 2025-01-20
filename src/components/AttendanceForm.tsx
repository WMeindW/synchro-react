import React, {useEffect, useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts"
import {Parser} from "../service/Parser.ts";
import {Client} from "../service/Client.ts";

export default function AttendanceForm() {
    // State to store form data
    const getUsernameFromCookie = () => {
        let usernameCookie = "";
        for (const c of document.cookie.split(";")) {
            if (c.split("=")[0] == "username") {
                usernameCookie = c.split("=")[1];
            }
        }
        return usernameCookie;
    }
    const [formData, setFormData] = useState({
        username: getUsernameFromCookie()
    });

    const [checkedIn, setCheckedIn] = useState({
        checkedIn: false
    });
    // Handle input changes and update state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    async function queryAttendance() {
        return await Client.getText(SynchroConfig.apiUrl + "user/query-attendance?username=" + formData.username);
    }

    useEffect(() => {
        queryAttendance().then((response) => {
            if (response == "false")
                setCheckedIn({checkedIn: false})
            else if ((response == "true"))
                setCheckedIn({checkedIn: true})
        })
    }, []);
    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission
        console.log("Cookie: " + document.cookie)
        fetch(SynchroConfig.apiUrl + "user/check-attendance", {
            method: "POST",
            headers: {
                "Content-Type": "text/html"
            },
            body: formData.username
        })
            .then((response) => {
                if (response.status != 200) Client.openDialog("Error checking attendance!")
            })
            .catch(() => Client.openDialog("Error checking attendance!"));
        setCheckedIn({checkedIn: !checkedIn.checkedIn})
    };

    const handleChecks = (isChecked: boolean): string => {
        if (isChecked)
            return "Check-Out"
        return "Check-In"
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Attendance</label>
            <select dangerouslySetInnerHTML={{__html: Parser.parseUsers()}} name="username"
                    value={formData.username} onChange={handleChange}>
            </select>
            <button type="submit">{handleChecks(checkedIn.checkedIn)}</button>
        </form>
    );
}