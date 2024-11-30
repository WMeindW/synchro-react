import React, {useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts"
import {SynchroService} from "../service/SynchroService.ts";

interface Props {
    submitForm: () => void
    id: number
    type: string
    username: string
    start: string
    end: string
}

export default function EditForm(props: Props) {
    // State to store form data
    const [formData, setFormData] = useState({
        id: props.id,
        type: props.type,
        username: props.username,
        start: props.start,
        end: props.end
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
        console.log(jsonData); // You can send this data to a server or log it


        fetch(SynchroConfig.apiUrl + "user/edit-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
            .then((response) => response.json())
            .then((data) => console.log("Success:", data))
            .catch((error) => console.error("Error:", error));
        props.submitForm();
    };

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission

        // Convert the form data to JSON
        const jsonData = JSON.stringify(formData);

        fetch(SynchroConfig.apiUrl + "user/delete-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
            .then((response) => response.json())
            .then((data) => console.log("Success:", data))
            .catch((error) => console.error("Error:", error));
        props.submitForm();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Edit Event</label>
            <input name="id" type="hidden" value={formData.id} onChange={handleChange}/>
            <select dangerouslySetInnerHTML={{__html: SynchroService.parseShiftTypes()}} name="type"
                    value={formData.type} id={"5"} onChange={handleChange}>
            </select>
            <select dangerouslySetInnerHTML={{__html: SynchroService.parseUsers()}} name="username"
                    value={formData.username} id={"5"} onChange={handleChange}>
            </select>
            <input name="start" type="datetime-local" value={formData.start} onChange={handleChange}/>
            <input name="end" type="datetime-local" value={formData.end} onChange={handleChange}/>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleDelete}>Delete</button>
        </form>
    );
}