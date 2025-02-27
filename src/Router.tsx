import {useEffect, useState} from "react";
import Home from "./routes/Home.tsx";
import Menu from "./components/Menu.tsx";
import Users from "./routes/Users.tsx";
import EventsRoute from "./routes/EventsRoute.tsx";
import Summary from "./routes/Summary.tsx";

export default function Router() {
    const [page, setPage] = useState(<Home key={"Home"}/>);

    useEffect(() => {
        redirect(window.location.hash.substring(1));
        window.addEventListener("hashchange", () => redirect(window.location.hash.substring(1)));
    }, []);

    const redirect = (name: string) => {
        name = name.trim();
        if (name === "Home")
            setPage(<Home key={"Home"}/>);
        else if (name === "Users")
            setPage(<Users key={"Users"}/>);
        else if (name === "Events")
            setPage(<EventsRoute key={"Events"}/>);
        else if (name === "Summary")
            setPage(<Summary key={"Summary"}/>);
        else {
            // @ts-ignore
            name = page.key.toString();
        }
        window.location.hash = name;
    }
    return (<>
        <Menu pageState={page.key as string} onClick={redirect}/>
        {page}
    </>);
}