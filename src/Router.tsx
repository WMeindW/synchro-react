import {useEffect, useState} from "react";
import Home from "./routes/Home.tsx";
import Menu from "./components/Menu.tsx";
import Users from "./routes/Users.tsx";
import Events from "./routes/Events.tsx";
import Summary from "./routes/Summary.tsx";

export default function Router() {
    const [page, setPage] = useState(<Home key={"Home"}/>);
    useEffect(() => {

    }, []);

    const redirect = (name: string) => {
        if (name === "Home")
            setPage(<Home key={"Home"}/>);
        else if (name === "Users")
            setPage(<Users key={"Users"}/>);
        else if (name === "Events")
            setPage(<Events key={"Events"}/>);
        else if (name === "Summary")
            setPage(<Summary key={"Summary"}/>);
    }
    return (<>
        <Menu pageState={page.key as string} onClick={redirect}/>
        {page}
    </>);
}