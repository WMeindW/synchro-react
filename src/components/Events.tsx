import CalendarTimeline from "./Timeline.tsx";
import {useEffect, useState} from "react";
import moment from "moment/moment";

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

interface Props {
    eventClick: (event: Item, username: string) => void;
}

export default function Events(props: Props) {
    const gs: Group[] = []
    const is: Item[] = []
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
                start: moment(event.timeStart).toDate(),
                end: moment(event.timeEnd).toDate()
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
        props.eventClick(item, username);
    }

    useEffect(() => {
        console.log("querying")
        queryEvents().then((events) => {
            // @ts-ignore
            processEvents(events["events"]);
        })
    }, []);

    return <div>
        <CalendarTimeline groups={groups} items={items} eventClick={(item) => showEditEvent(item)}/>
    </div>
}