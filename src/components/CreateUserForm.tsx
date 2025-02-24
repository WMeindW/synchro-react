import React, {useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts"
import {Parser} from "../service/Parser.ts";
import {Client} from "../service/Client.ts";

export default function CreateUserForm() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
        email: "",
        phone: ""
    });

    const [link, setLink] = useState("Generated sign-up link...");

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
        const jsonData = JSON.stringify(formData);
        fetch(SynchroConfig.apiUrl + "admin/create-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
            .then(response => {
                if (response.status != 200) Client.openDialog("Error creating user!")
                return response.json();
            })
            .then(data => {
                setLink(data["token"])
            })
            .catch(() => {
                Client.openDialog("Error creating user!")

            });
    };

    return (
        <form className={"container-form"} onSubmit={handleSubmit}>
            <input placeholder={"Username"} type="text" id="username" onChange={handleChange} name="username" required/><br/><br/>

            <input placeholder={"Phone"} type="tel" id="phone" name="phone" onChange={handleChange} required/><br/><br/>

            <input placeholder={"Email"} type="email" id="email" name="email" onChange={handleChange}
                   required/><br/><br/>

            <input placeholder={"Password"} type="password" id="password" name="password" onChange={handleChange}
                   required/><br/><br/>

            <select dangerouslySetInnerHTML={{__html: Parser.parseUserTypes()}} name="role"
                    id="role" onChange={handleChange}/>

            <button type="submit">Create User</button>
            <a href={link} id="link">{link}</a>
        </form>
    );
}