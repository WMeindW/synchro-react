import React, {useState} from "react";

interface User {
    id: string
    email: string
    phone: string
    username: string
    role: string
    enabled: string
}

interface Props {
    user: User
}

export default function UserEditForm(props: Props) {
    const [formData, setFormData] = useState({
        username: props.user.username,
        password: "",
        role: props.user.role,
        email: props.user.email,
        phone: props.user.phone
    })
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
        fetch("http://localhost:8083/admin/edit-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => {
                console.error('Error:', error);
                alert('Error creating user.');
            });
    };


    return <form onSubmit={handleSubmit}>
        <label>Edit User</label><br/><br/>

        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={formData.username} onChange={handleChange} name="username"
               required/><br/><br/>

        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required/><br/><br/>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/><br/><br/>

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}
               required/><br/><br/>

        <label htmlFor="role">Role:</label>
        <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} required/><br/><br/>

        <button type="submit">Edit User</button>
    </form>
}