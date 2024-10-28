import React, {useState} from "react";

export default function CreateForm() {
    // State to store form data
    const [formData, setFormData] = useState({
        type: "",
        username: "",
        start: "",
        end: ""
    });

    // Handle input changes and update state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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


        fetch("/synchro/api/user/create-event", {
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
            <input name="username" type="text" placeholder="Username" value={formData.username}
                   onChange={handleChange}/>
            <input name="start" type="datetime-local" value={formData.start} onChange={handleChange}/>
            <input name="end" type="datetime-local" value={formData.end} onChange={handleChange}/>
            <button type="submit">Submit</button>
        </form>
    );
}