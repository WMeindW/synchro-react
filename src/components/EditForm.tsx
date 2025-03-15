import React, {useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts"
import {Parser} from "../service/Parser.ts";
import {Client} from "../service/Client.ts";

interface Props {
    submitForm: () => void
    id: number
    type: string
    username: string
    start: string
    end: string
}

export default function EditForm(props: Props) {
    const [formData, setFormData] = useState({
        id: props.id,
        type: props.type,
        username: props.username,
        start: props.start,
        end: props.end
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


        fetch(SynchroConfig.apiUrl + "user/edit-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
            .then((response) => {
                if (response.status != 200) Client.openDialog("Error editing event!")
            })
            .catch(() => Client.openDialog("Error editing event!"));
        props.submitForm();
    };

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();

        const jsonData = JSON.stringify(formData);

        fetch(SynchroConfig.apiUrl + "user/delete-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
            .then((response) => {
                if (response.status != 200) Client.openDialog("Error deleting event!")
            })
            .catch(() => Client.openDialog("Error deleting event!")
            );
        props.submitForm();
    };

    return (
        <form autoComplete={"off"} className={"container-form"} style={{marginLeft: 0}} onSubmit={handleSubmit}>
            <img className={"attendance-clock"} alt={"edit icon"} src={SynchroConfig.hostUrl + "edit.svg"}/>
            <input required={true} name="id" type="hidden" value={formData.id} onChange={handleChange}/>
            <select required={true} dangerouslySetInnerHTML={{__html: Parser.parseShiftTypes()}} name="type"
                    value={formData.type} onChange={handleChange}>
            </select>
            <select required={true} dangerouslySetInnerHTML={{__html: Parser.parseUsers()}} name="username"
                    value={formData.username} onChange={handleChange}>
            </select>
            <input required={true} name="start" type="datetime-local" value={formData.start} onChange={handleChange}/>
            <input required={true} name="end" type="datetime-local" value={formData.end} onChange={handleChange}/>
            <button type="submit">Edit Event</button>
            <button type="button" onClick={handleDelete}>Delete</button>
        </form>
    );
}