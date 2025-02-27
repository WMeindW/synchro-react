import React, {useEffect, useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts";
import {Client} from "../service/Client.ts";

interface Props {
    motd: string;
}

export default function CreateMotd(props: Props) {
    const [renderedMotd, setRenderedMotd] = useState({
        __html: ""
    });
    const [formData, setFormData] = useState({
        motd: props.motd
    });

    useEffect(() => {
        setFormData({...formData, motd: props.motd})
        //queryMotd({motd: props.motd}).then((response) => setRenderedMotd({...formData, __html: response}))
    }, [props.motd]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            motd: e.target.value
        });
        setRenderedMotd({...formData, __html: e.target.value})
        queryMotd({motd: e.target.value}).then((response) => setRenderedMotd({...formData, __html: response}))
    };

    async function queryMotd(motd: { motd: string }): Promise<string> {
        const jsonData = JSON.stringify(motd);
        try {
            const response = await fetch(SynchroConfig.apiUrl + "admin/test-motd", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: jsonData
            });
            return await response.text();
        } catch (error) {
            Client.openDialog("Error testing motd!")
            return "";
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission
        const jsonData = JSON.stringify(formData);
        fetch(SynchroConfig.apiUrl + "admin/save-motd", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        }).then((response) => {
            if (response.status != 200) Client.openDialog("Error saving motd!")
        }).catch(() => Client.openDialog("Error saving motd!"));
    };

    return <form className={"container-form"} onSubmit={handleSubmit}>
        <div className={"rendered-motd-container"} dangerouslySetInnerHTML={renderedMotd}></div>
        <input required name={"motd"} onChange={handleChange} value={formData.motd} type={"text"}
               placeholder={"Paste motd here"}></input>
        <button type="submit">Save Motd</button>
    </form>
}