import React, {useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts";

export default function CreateMotd() {
    const [renderedMotd, setRenderedMotd] = useState({__html: ""});
    const [formData, setFormData] = useState({
        motd: ""
    });

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

    return <div>
        <div style={{
            width: "100%",
            minHeight: "50px",
            padding: "0",
            margin: "0",
            border: "1px solid black",
            marginBottom: "10px"
        }}
             dangerouslySetInnerHTML={renderedMotd}></div>

        <input name={"motd"} onChange={handleChange} value={formData.motd} type={"textarea"}
               style={{
                   width: "100%",
                   minHeight: "50px",
                   padding: "0",
                   margin: "0",
                   border: "1px solid black",
                   marginBottom: "10px"
               }}
               placeholder={"Motd..."}></input>
    </div>
}