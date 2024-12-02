import React, {useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts"
import {SynchroService} from "../service/SynchroService.ts";

export default function CreateForm() {
    // State to store form data
    const [formData, setFormData] = useState({
        type: "",
        username: "",
        start: "",
        end: ""
    });

    // Handle input changes and update state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission

        // Convert the form data to JSON
        const jsonData = JSON.stringify(formData);

        fetch(SynchroConfig.apiUrl + "user/create-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
            .then((response) => response.json())
            .then((data) => console.log("Success:", data))
            .catch((error) => console.error("Error:", error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Create Event</label>
            <input name="type" type="text" placeholder="Type" value={formData.type} onChange={handleChange}/>
            <select dangerouslySetInnerHTML={{__html: SynchroService.parseUsers()}} name="username"
                    value={formData.username} onChange={handleChange}>
            </select>
            <input name="start" type="datetime-local" value={formData.start} onChange={handleChange}/>
            <input name="end" type="datetime-local" value={formData.end} onChange={handleChange}/>
            <button type="submit">Submit</button>
        </form>
    );
}