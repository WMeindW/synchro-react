import React, {useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts"
import {Parser} from "../service/Parser.ts";
import {Client} from "../service/Client.ts";

export default function CreateUserForm(props: { method: () => void }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
        email: "",
        phone: ""
    });

    const [link, setLink] = useState("");

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
        fetch(SynchroConfig.apiUrl + "admin/create-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
            .then(async response => {
                if (response.status != 200) Client.openDialog("Error creating user!")
                else {
                    response.json().then((result) => setLink(result["token"]))
                    props.method();
                }
            })
            .catch(() => {
                Client.openDialog("Error creating user!")
            });
    };
    return (
        <form autoComplete={"off"} className={"container-form"} onSubmit={handleSubmit}>
            <svg className={"attendance-clock"} xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 460 460">
                <rect width="100%" height="100%" fill="#D8C4B6"/>
                <path fill="#3E5879"
                      d="M232.21 0c31.37 0 61.4 6.28 88.81 17.64l.91.41c28.03 11.76 53.26 28.86 74.38 49.99 21.48 21.5 38.73 47.06 50.47 75.38 11.36 27.41 17.64 57.44 17.64 88.79 0 7.72-.38 15.35-1.13 22.88a124.045 124.045 0 0 0-34-10.09c.27-4.23.41-8.49.41-12.79 0-26.81-5.3-52.32-14.92-75.51a197.87 197.87 0 0 0-42.87-64.13C353.86 74.5 332.4 59.95 308.6 49.96l-.86-.33c-23.19-9.61-48.7-14.92-75.53-14.92s-52.34 5.31-75.53 14.92c-24.2 9.99-45.92 24.67-64.11 42.88-18.07 18.05-32.62 39.5-42.61 63.3l-.33.87c-9.61 23.19-14.92 48.7-14.92 75.53s5.31 52.34 14.92 75.53a196.342 196.342 0 0 0 23.46 41.56c19.5-13.07 70.39-20.77 91.17-27.36 20.35-6.45 22.32-8.02 28.05-25.05-7.36-6.28-14.46-16.1-15.64-29.07l-.97.02c-2.24-.03-4.39-.54-6.41-1.69-3.23-1.84-5.5-4.99-7.04-8.55-5.17-10.24-11.26-34.95 2.36-32.71l-1.7-3.19c-.32-3.96-.4-8.73-.48-13.76-.29-18.46-.67-40.83-15.51-45.31l-6.37-1.92c32.21-39.95 90.6-97.95 137.49-40.86 47.34 4.6 62.44 75.67 29.97 107.04 1.94.07 3.78.53 5.41 1.4 6.18 3.31 6.38 10.49 4.75 16.53-1.6 5.04-3.64 10.88-5.57 15.79-2.34 6.64-5.76 7.87-12.38 7.15-.29 14.34-9.61 21.19-18.75 29.13 6.67 9.59 9.34 14.34 16.24 18.61-7.65 16.2-11.92 34.27-11.92 53.36 0 30.56 10.96 58.58 29.17 80.32-25.75 9.84-53.68 15.24-82.75 15.24-31.35 0-61.39-6.28-88.81-17.64l-.91-.41c-28.03-11.76-53.26-28.86-74.39-50-21.43-21.42-38.67-46.97-50.44-75.36C6.28 293.61 0 263.58 0 232.21c0-31.38 6.28-61.41 17.64-88.81l.41-.91c11.76-28.03 28.86-53.26 50-74.39 21.43-21.43 46.98-38.67 75.36-50.44C170.8 6.28 200.83 0 232.21 0zm163.25 328.33c-.04-4.58-.46-7.86 5.22-7.78l18.42.22c5.94-.03 7.52 1.85 7.45 7.42v25.13h24.98c4.58-.04 7.86-.47 7.77 5.22l-.22 18.43c.03 5.93-1.84 7.51-7.42 7.44h-25.11v25.11c.07 5.57-1.51 7.45-7.45 7.42l-18.42.22c-5.68.08-5.26-3.2-5.22-7.78v-24.97h-25.12c-5.58.07-7.46-1.51-7.43-7.44l-.21-18.43c-.09-5.69 3.19-5.26 7.77-5.22h24.99v-24.99zm15.53-60.47c27.9 0 53.16 11.31 71.43 29.58l.44.48c18.02 18.25 29.14 43.34 29.14 70.94 0 27.9-11.31 53.16-29.58 71.43-18.27 18.27-43.53 29.58-71.43 29.58-27.85 0-53.13-11.31-71.4-29.6-18.29-18.25-29.6-43.51-29.6-71.41 0-27.86 11.31-53.12 29.6-71.39 18.25-18.3 43.52-29.61 71.4-29.61zm60.63 40.38c-15.51-15.51-36.95-25.11-60.63-25.11-23.67 0-45.12 9.6-60.62 25.11-15.52 15.47-25.11 36.92-25.11 60.62 0 23.68 9.6 45.13 25.11 60.63 15.47 15.52 36.91 25.11 60.62 25.11 23.68 0 45.12-9.6 60.63-25.11 15.51-15.5 25.11-36.95 25.11-60.63 0-23.49-9.43-44.78-24.69-60.22l-.42-.4z"/>
            </svg>
            <input pattern={"(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]"} required={true} placeholder={"Username"} type="text" id="username" onChange={handleChange}
                   name="username"/>

            <input pattern={"\\+?[1-9]\\d{1,14}"} required={true} placeholder={"Phone"} type="tel" id="phone" name="phone" onChange={handleChange}/>

            <input required={true} placeholder={"Email"} type="email" id="email" name="email" onChange={handleChange}
            />

            <input required={true} placeholder={"Password"} type="password" id="password" name="password"
                   onChange={handleChange}
            />

            <select required={true} value={formData.role} dangerouslySetInnerHTML={{__html: Parser.parseUserTypes()}}
                    name="role"
                    id="role" onChange={handleChange}/>
            <button type="submit">Create User</button>
            <a style={{display: link == "" ? "none" : "flex"}} href={link}>Generated Link</a>
        </form>
    );
}