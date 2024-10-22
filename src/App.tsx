import CalendarTimeline from "./components/Timeline.tsx";
import CreateForm from "./components/CreateForm.tsx";
import {useEffect, useState} from "react";

interface Group {
    id: number
    title: string
}

interface Event {
    timeStart: string,
    timeEnd: string
    username: string
    type: string
}

interface Items {
    id: number,
    group: number,
    title: string,
    start_time: string,
    end_time: string
}

export default function App() {
    const [groups, setGroups] = useState([]);
    const [items, setItems] = useState([]);

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

    useEffect(() => {
        queryEvents().then((events) => {
            for (const event of events["events"]) {
                console.log(event.timeStart)
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