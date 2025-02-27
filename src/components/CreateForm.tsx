import React, {useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts"
import {Parser} from "../service/Parser.ts";
import {Client} from "../service/Client.ts";


export default function CreateForm() {
    const [formData, setFormData] = useState({
        type: "",
        username: "",
        start: "",
        end: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const jsonData = JSON.stringify(formData);

        fetch(SynchroConfig.apiUrl + "user/create-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
            .then((response) => {
                if (response.status != 200) Client.openDialog("Error creating event!")
            })
            .catch(() => Client.openDialog("Error creating event!"));
    };

    return (
        <form className={"container-form"} onSubmit={handleSubmit}>
            <select dangerouslySetInnerHTML={{__html: Parser.parseShiftTypes()}} name="type"
                    value={formData.type} onChange={handleChange}>
            </select>
            <select dangerouslySetInnerHTML={{__html: Parser.parseUsers()}} name="username"
                    value={formData.username} onChange={handleChange}>
            </select>
            <input name="start" type="datetime-local" value={formData.start} onChange={handleChange}/>
            <input name="end" type="datetime-local" value={formData.end} onChange={handleChange}/>
            <button type="submit">Create Event</button>
        </form>
    );
}