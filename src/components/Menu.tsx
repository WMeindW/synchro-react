import {useEffect, useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts";

interface Props {
    pageState: string
    onClick: (name: string) => void
}

export default function Menu(props: Props) {
    const [pageState, setPageState] = useState(<header key={0}></header>);
    const pages = ["Home", "Events", "Summary", "Users"]
    useEffect(() => {
        let children = [];
        let i = 1;
        for (let page of pages) {
            if (page == props.pageState)
                children.push(<div key={i} onClick={() => props.onClick(page)}
                                   className={"header-field active"}>{page}</div>)
            else
                children.push(<div key={i} onClick={() => props.onClick(page)}
                                   className={"header-field"}>{page}</div>)
            i++;
        }
        setPageState(<header key={0}><img className={"icon"} src={SynchroConfig.hostUrl + "icon.svg"}
                                          alt={"icon"}/>{children}</header>)
    }, [props.pageState]);
    return (<>{pageState}</>);
}