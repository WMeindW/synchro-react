import CalendarTimeline from "./components/Timeline.tsx";
import CreateForm from "./components/CreateForm.tsx";
import {useEffect, useState} from "react";
import Logout from "./components/Logout.tsx";
import EditForm from "./components/EditForm.tsx";

interface Event {
    id: number
    timeStart: string
    timeEnd: string
    username: string
    type: string
}

interface Group {
    id: number
    content: string
}

interface Item {
    id: number,
    group: number,
    content: string,
    start: Date,
    end: Date
}

export default function App() {
    const gs: Group[] = []
    const is: Item[] = []
    const [groups, setGroups] = useState(gs);
    const [items, setItems] = useState(is);
    const [editForm, setEditForm] = useState(<div></div>);

    async function queryEvents(): Promise<Event[]> {
        try {
            const response = await fetch("http://localhost:8083/user/query-event", {
                method: "GET"
            });
            return await response.json();
        } catch (error) {
            console.error("Error fetching events:", error);
            return [];
        }
    }

    function processEvents(events: Event[]) {
        const gs: Group[] = []
        const is: Item[] = []
        for (const event of events) {
            let giduser = -1;
            groups.forEach((group) => (gs.push(group)))
            items.forEach((item) => (is.push(item)))
            for (const group of gs) {
                if (group.content === event.username) {
                    giduser = group.id;
                }
            }
            if (giduser === -1) {
                giduser = gs.length;
                gs.push({
                    id: gs.length,
                    content: event.username
                })
            }
            is.push({
                id: event.id,
                group: giduser,
                content: event.type,
                start: new Date(event.timeStart),
                end: new Date(event.timeEnd)
            })
        }
        setGroups(gs);
        setItems(is);
    }

    function showEditEvent(item: Item) {
        let username = "";
        groups.forEach((group) => {
            if (group.id === item.group) username = group.content
        })
        console.log(item.end.toISOString())
        setEditForm(<EditForm submitForm={hideEditForm} end={item.end.toISOString().substring(0,16)} start={item.start.toISOString().substring(0,16)}
                              type={item.content} username={username}/>);
    }

    function hideEditForm() {
        setEditForm(<div></div>);
    }

    useEffect(() => {
        queryEvents().then((events) => {
            // @ts-ignore
            processEvents(events["events"]);
        })
    }, []);
    return (
        <>
            <div>
                <CreateForm/>
            </div>
            <div>
                <CalendarTimeline groups={groups} items={items} eventClick={(item) => showEditEvent(item)}/>
            </div>
            <div>
                {editForm}
            </div>
            <div>
                <Logout/>
            </div>
        </>
    );
};