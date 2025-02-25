import {useEffect, useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts"
import CreateMotd from "./CreateMotd.tsx";
import {Client} from "../service/Client.ts";

export default function MotdFrame() {
    const [motd, setMotd] = useState({
        __html: "<div>\n" +
            "    <div>\n" +
            "        <h1>Welcome to Our Server!</h1>\n" +
            "    </div>\n" +
            "\n" +
            "    <div>\n" +
            "        <h2>Today's Announcement</h2>\n" +
            "        <p>We have some exciting updates coming soon. Stay tuned!</p>\n" +
            "    </div>\n" +
            "\n" +
            "    <div>\n" +
            "        <h3>Important Notice</h3>\n" +
            "        <p>Maintenance is scheduled for this weekend. Expect some downtime.</p>\n" +
            "    </div>\n" +
            "\n" +
            "    <div>\n" +
            "        <h2>Image of the Day</h2>\n" +
            "        <img src=\"\" alt=\"MOTD Image\">\n" +
            "    </div>\n" +
            "\n" +
            "    <div>\n" +
            "        <h2>Stay Connected</h2>\n" +
            "        <p>Join our community and stay updated with the latest news.</p>\n" +
            "        <img src=\"\" alt=\"Community Logo\">\n" +
            "    </div>\n" +
            "</div>"
    });

    async function queryMotd(): Promise<string> {
        return await Client.getText(SynchroConfig.apiUrl + "user/query-motd");
    }

    useEffect(() => {
        /*queryMotd().then(result => {
            console.log(result);
            setMotd({...motd, __html: result})
        })

         */
    }, []);
    return <>
        <div className={"motd-fields-container"} dangerouslySetInnerHTML={motd}></div>
        <CreateMotd motd={motd.__html}/>
    </>
}