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
            const response = await fetch("/synchro/api/user/query-event", {
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
        const is: Items[] = []
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
        console.log(is);
        setGroups(gs);
        setItems(is);
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
            <div style={{height: '600px'}}>
                <CalendarTimeline groups={groups} items={items}/>
            </div>
        </>
    );
};