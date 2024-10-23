import CalendarTimeline from "./components/Timeline.tsx";
import CreateForm from "./components/CreateForm.tsx";
import {useEffect, useState} from "react";

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

interface Items {
    id: number,
    group: number,
    content: string,
    start: Date,
    end: Date
}

export default function App() {
    const gs: Group[] = []
    const is: Items[] = []
    const [groups, setGroups] = useState(gs);
    const [items, setItems] = useState(is);

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

    function processEvents(event: Event) {
        const user = event.username;
        let giduser = null;
        let last_gid = -1;
        for (const group of groups) {
            if (group.content == user)
                giduser = group.id;
            last_gid = group.id;
        }
        if (giduser == null) {
            const gs: Group[] = groups;
            giduser = last_gid + 1;
            gs.push({
                id: last_gid + 1,
                content: user
            });
            console.log(gs)
            setGroups(gs);
        }
        const is: Items[] = items;
        const item: Items = {
            id: event.id,
            group: giduser,
            content: event.type,
            start: new Date(event.timeStart),
            end: new Date(event.timeEnd)
        };
        for (const item1 of is) {
            if (item1.id == item.id) return;
        }
        is.push(item)
        setItems(is);
    }

    useEffect(() => {
        queryEvents().then((events) => {
            for (const event of events["events"]) {
                processEvents(event);
            }
        })
    }, []);
    return (
        <>
            <div>
                <CreateForm/>
            </div>
            <div style={{height: '600px'}}>
                <CalendarTimeline groups={groups} items={items}/>
            </div>
        </>
    );
};