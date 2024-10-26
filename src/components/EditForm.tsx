import React, {useState} from "react";

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


        fetch("http://localhost:8083/user/edit-event", {
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
            <input name="type" type="text" placeholder="Type" value={formData.type} onChange={handleChange}/>
            <input name="username" type="text" placeholder="Username" value={formData.username}
                   onChange={handleChange}/>
            <input name="start" type="datetime-local" value={formData.start} onChange={handleChange}/>
            <input name="end" type="datetime-local" value={formData.end} onChange={handleChange}/>
            <button type="submit">Submit</button>
        </form>
    );
}