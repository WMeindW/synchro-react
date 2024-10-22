import CalendarTimeline from "./components/Timeline.tsx";
import CreateForm from "./components/CreateForm.tsx";
import {useEffect, useState} from "react";

interface Event {
    timeStart: string,
    timeEnd: string
    username: string
    type: string
}

interface Group {
    id: number
    title: string
}

interface Items {
    id: number,
    group: number,
    title: string,
    start_time: Date,
    end_time: Date
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
            const data = await response.json();
            return data;
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
            if (group.title == user)
                giduser = group.id;
            last_gid = group.id;
        }
        if (giduser == null) {
            const gs: Group[] = [];
            giduser = last_gid + 1;
            gs.push({
                id: last_gid + 1,
                title: user
            });
            console.log(gs);
            setGroups(gs);
        }
        const is: Items[] = items;
        is.push({
            id: is.length,
            group: giduser,
            title: event.type,
            start_time: new Date(event.timeStart),
            end_time: new Date(event.timeEnd)
        })
        setItems(is);
        console.log(is);
    }

    useEffect(() => {
        queryEvents().then((events) => {
            for (const event of events["events"]) {
                processEvents(event);
            }
        })
    });
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