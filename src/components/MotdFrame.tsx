import {useEffect, useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts"

export default function MotdFrame() {
    const [motd, setMotd] = useState({__html: ""});

    async function queryMotd(): Promise<string> {
        try {
            const response = await fetch(SynchroConfig.apiUrl + "user/query-motd", {
                method: "GET"
            });
            return await response.text();
        } catch (error) {
            console.error("Error fetching users:", error);
            return "";
        }
    }

    useEffect(() => {
        queryMotd().then(result => {
            console.log(result);
            setMotd({...motd, __html: result})
        })
    }, []);
    return <div>Motd:
        <div style={{border: "1px solid black", padding: "20px", margin: "10px"}} dangerouslySetInnerHTML={motd}></div>
    </div>
}