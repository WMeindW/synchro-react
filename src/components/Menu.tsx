import {useEffect, useState} from "react";

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
                                   className={"header-container active"}>{page}</div>)
            else
                children.push(<div key={i} onClick={() => props.onClick(page)}
                                   className={"header-container"}>{page}</div>)
            i++;
        }
        setPageState(<header key={0}>{children}</header>)
        console.log(pageState)
    }, [props.pageState]);
    return (<>{pageState}</>);
}