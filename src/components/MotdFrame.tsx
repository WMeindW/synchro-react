import {useEffect, useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts"
import CreateMotd from "./CreateMotd.tsx";
import {Client} from "../service/Client.ts";

export default function MotdFrame() {
    const [motd, setMotd] = useState({
        __html: ""
    });

    async function queryMotd(): Promise<string> {
        return await Client.getText(SynchroConfig.apiUrl + "user/query-motd");
    }

    useEffect(() => {
        queryMotd().then(result => {
            setMotd({...motd, __html: result})
        })
    }, []);
    return <>
        <div className={"motd-fields-container"} dangerouslySetInnerHTML={motd}></div>
        <CreateMotd motd={motd.__html}/>
    </>
}