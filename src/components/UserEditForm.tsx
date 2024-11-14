import React, {useEffect, useState} from "react";

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
        username: "",
        password: "",
        role: "",
        email: "",
        phone: "",
        id: ""
    })
    useEffect(() => {
        setFormData({
            ...formData, username: props.user.username,
            password: "",
            role: props.user.role,
            email: props.user.email,
            phone: props.user.phone,
            id: props.user.id
        })
    }, [props.user]);

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

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission
        const jsonData = JSON.stringify({id: formData.id, username: formData.username});
        fetch("http://localhost:8083/admin/delete-user", {
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
    }

    return <form onSubmit={handleSubmit}>
        <label>Edit User</label><br/><br/>
        <input type="hidden" id="id" value={formData.id} onChange={handleChange} name="id"
               required/>

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

        <button type="submit">Edit</button>
        <button type="button" onClick={handleDelete}>Delete</button>

    </form>
}