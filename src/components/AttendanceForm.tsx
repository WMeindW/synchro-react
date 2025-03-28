import React, {useEffect, useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts"
import {Parser} from "../service/Parser.ts";
import {Client} from "../service/Client.ts";

export default function AttendanceForm() {
    const [formData, setFormData] = useState({
        username: Parser.getUsernameFromCookie()
    });

    const [checkedIn, setCheckedIn] = useState({
        checkedIn: false
    });

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
    }, [formData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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

    return (
        <form className={"container-form"} onSubmit={handleSubmit}>
            <svg className={"attendance-clock"} width="2em" height="2em" viewBox="1 1 22 22"
                 xmlns="http://www.w3.org/2000/svg">
                <rect width="150%" height="150%" fill="#D8C4B6"/>
                <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="#3E5879"/>
                <path
                    d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z"
                    fill="#D8C4B6"/>
            </svg>
            <select dangerouslySetInnerHTML={{__html: Parser.parseUsers()}} required={true} name="username"
                    defaultValue={formData.username} onChange={handleChange}>
            </select>
            <button className={"button"} type="submit">{checkedIn.checkedIn ? "Check-Out" : "Check-In"}</button>
        </form>
    );
}