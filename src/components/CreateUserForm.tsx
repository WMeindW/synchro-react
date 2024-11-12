import React, {useState} from "react";

export default function CreateUserForm() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: ""
    });

    const [link, setLink] = useState("");

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
        const jsonData = JSON.stringify(formData);
        fetch("http://localhost:8083/admin/create-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
            .then(response => response.json())
            .then(data => {
                setLink(data["token"])
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error creating user.');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Create User</label><br/><br/>

            <label htmlFor="username">Username:</label>
            <input type="text" id="username" onChange={handleChange} name="username" required/><br/><br/>

            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" onChange={handleChange} required/><br/><br/>

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" onChange={handleChange} required/><br/><br/>

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" onChange={handleChange} required/><br/><br/>

            <label htmlFor="role">Role:</label>
            <input type="text" id="role" name="role" onChange={handleChange} required/><br/><br/>

            <label>
                <textarea id="link" value={link} readOnly={true}></textarea>
            </label>

            <button type="submit">Create User</button>
        </form>
    );
}