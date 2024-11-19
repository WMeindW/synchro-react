import React, {useEffect, useState} from "react";

export default function AttendanceForm() {
    // State to store form data
    const getUsernameFromCookie = () => {
        let usernameCookie = "";
        for (const c of document.cookie.split(";")) {
            if (c.split("=")[0] == "username") {
                usernameCookie = c.split("=")[1];
                console.log("username: " + usernameCookie + " = " + c.toString());
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    async function queryAttendance() {
        try {
            const response = await fetch("http://localhost:8083/user/query-attendance?username=" + formData.username, {
                method: "GET",
            });
            return await response.text();
        } catch (error) {
            console.error("Error fetching events:", error);
            return "";
        }
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
        fetch("http://localhost:8083/user/check-attendance", {
            method: "POST",
            headers: {
                "Content-Type": "text/html"
            },
            body: formData.username
        })
            .then((response) => response.json())
            .then((data) => console.log("Success:", data))
            .catch((error) => console.error("Error:", error));
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
            <input name="username" type="text" placeholder={"Username"} value={formData.username}
                   onChange={handleChange}/>
            <button type="submit">{handleChecks(checkedIn.checkedIn)}</button>
        </form>
    );
}