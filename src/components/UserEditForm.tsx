import React, {useEffect, useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts"
import {Parser} from "../service/Parser.ts";
import {Client} from "../service/Client.ts";

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
    submit: () => void
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
        fetch(SynchroConfig.apiUrl + "admin/edit-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
            .then(response => {
                if (response.status != 200) Client.openDialog("Error editing user!")
                else
                    props.submit();
            })
            .catch(() => Client.openDialog("Error editing user!"));
    };

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        const jsonData = JSON.stringify({id: formData.id, username: formData.username});
        fetch(SynchroConfig.apiUrl + "admin/delete-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
            .then(response => {
                if (response.status != 200) Client.openDialog("Error deleting user!")
                else
                    props.submit();
            })
            .catch(() => {
                Client.openDialog("Error deleting user!")
            });
    }

    return <form autoComplete={"off"} className={"user-edit-form"} onSubmit={handleSubmit}>
        <input required={true} type="hidden" id="id" value={formData.id} onChange={handleChange} name="id"
        />

        <input pattern={"(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]"} required={true} placeholder={"Username"} type="text" id="username" value={formData.username}
               onChange={handleChange} name="username"
        />

        <input pattern={"\\+?[1-9]\\d{1,14}"} required={true} placeholder={"Phone"} type="tel" id="phone" name="phone" value={formData.phone}
               onChange={handleChange}/>

        <input required={true} placeholder={"Email"} type="email" id="email" name="email" value={formData.email}
               onChange={handleChange}/>

        <input placeholder={"Password"} type="password" id="password" name="password" value={formData.password}
               onChange={handleChange}/>

        <select required={true} value={formData.role} dangerouslySetInnerHTML={{__html: Parser.parseUserTypes()}}
                name="role"
                id="role" onChange={handleChange}>
        </select>
        <button type="submit">Edit</button>
        <button type="button" onClick={handleDelete}>{props.user.enabled != "true" ? "Delete" : "Deactivate"}</button>

    </form>
}