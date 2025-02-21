import {useEffect, useState} from "react";
import Home from "./routes/Home.tsx";
import Menu from "./components/Menu.tsx";
import Users from "./routes/Users.tsx";
import Events from "./routes/Events.tsx";
import Summary from "./routes/Summary.tsx";

export default function Router() {
    const [page, setPage] = useState(<Home key={"Home"}/>);
    const [url, setUrl] = useState(parseUrl(window.location.href))

    function parseUrl(url: string) {
        if (url.includes("#")) {
            const urlParts = url.split("#");
            return urlParts[1];
        }
        return "home";

    }

    useEffect(() => {
        window.location.href = window.location.href.split("#")[0] + url;
    }, [url]);

    const redirect = (name: string) => {
        if (name.toLowerCase() === "home")
            setPage(<Home key={"Home"}/>);
        else if (name.toLowerCase() === "users")
            setPage(<Users key={"Users"}/>);
        else if (name.toLowerCase() === "events")
            setPage(<Events key={"Events"}/>);
        else if (name.toLowerCase() === "summary")
            setPage(<Summary key={"Summary"}/>);
        setUrl(name.toLowerCase)
    }
    return (<>
        <Menu pageState={page.key as string} onClick={redirect}/>
        {page}
    </>);
}