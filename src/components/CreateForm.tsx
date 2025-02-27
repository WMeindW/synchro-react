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
            <svg className={"attendance-clock"} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                 x="0px" y="0px" width="122.879px" height="122.879px"
                 viewBox="0 0 122.879 122.879" enable-background="new 0 0 122.879 122.879">
                <g>
                    <path fill="#3E5879" fill-rule="evenodd" clip-rule="evenodd"
                          d="M104.885,17.995c23.993,23.994,23.993,62.896,0,86.89 c-23.994,23.993-62.896,23.993-86.89,0c-23.993-23.994-23.993-62.896,0-86.89C41.989-5.998,80.891-5.998,104.885,17.995 L104.885,17.995z M93.607,57.949c1.928,0,3.49,1.563,3.49,3.49c0,1.928-1.563,3.49-3.49,3.49H64.93v28.678 c0,1.928-1.563,3.49-3.49,3.49c-1.927,0-3.489-1.563-3.489-3.49V64.93H29.272c-1.928,0-3.491-1.563-3.491-3.49 c0-1.927,1.563-3.49,3.491-3.49H57.95V29.271c0-1.927,1.563-3.49,3.489-3.49c1.928,0,3.49,1.563,3.49,3.49v28.678H93.607 L93.607,57.949z"/>
                </g>
            </svg>
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