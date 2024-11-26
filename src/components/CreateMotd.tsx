import React, {useEffect, useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts";

interface Props {
    motd: string;
}

export default function CreateMotd(props: Props) {
    const [renderedMotd, setRenderedMotd] = useState({__html: ""});
    const [formData, setFormData] = useState({
        motd: props.motd
    });

    useEffect(() => {
        setFormData({...formData, motd: props.motd})
        queryMotd({motd: props.motd}).then((response) => setRenderedMotd({...formData, __html: response}))
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
            console.error("Error fetching motd:", error);
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
        }).then(r => console.log(r.json()))
    };

    return <form onSubmit={handleSubmit}>
        <div style={{
            width: "100%",
            minHeight: "50px",
            padding: "0",
            margin: "0",
            border: "1px solid black",
            marginBottom: "10px"
        }}
             dangerouslySetInnerHTML={renderedMotd}></div>

        <input required name={"motd"} onChange={handleChange} value={formData.motd} type={"textarea"}
               style={{
                   width: "100%",
                   minHeight: "50px",
                   padding: "0",
                   margin: "0",
                   border: "1px solid black",
                   marginBottom: "10px"
               }}
               placeholder={"Motd..."}></input>
        <button type="submit">Save Motd</button>
    </form>
}