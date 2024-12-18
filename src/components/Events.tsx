import CalendarTimeline from "./Timeline.tsx";
import {useEffect, useState} from "react";
import moment from "moment/moment";
import EditForm from "./EditForm.tsx";
import {SynchroConfig} from "../config/SynchroConfig.ts"

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


export default function Events() {
    const gs: Group[] = []
    const is: Item[] = []
    const [groups, setGroups] = useState(gs);
    const [items, setItems] = useState(is);
    const [button, setButton] = useState("Show Attendance");
    const [attendance, setAttendance] = useState(false);

    const [editForm, setEditForm] = useState(<div></div>);


    function hideEditForm() {
        setEditForm(<div></div>);
    }

    async function queryEvents(): Promise<Event[]> {
        try {
            const response = await fetch(SynchroConfig.apiUrl + "user/query-event", {
                method: "GET"
            });
            return await response.json();
        } catch (error) {
            console.error("Error fetching events:", error);
            return [];
        }
    }

    async function queryAttendance(): Promise<Event[]> {
        try {
            const response = await fetch(SynchroConfig.apiUrl + "admin/query-attendance", {
                method: "GET"
            });
            return await response.json();
        } catch (error) {
            console.error("Error fetching events:", error);
            return [];
        }
    }

    function switchView() {
        console.log("querying");
        if (attendance) {
            queryEvents().then((events) => {
                // @ts-ignore
                processEvents(events["events"]);
            })
            setButton("Show Attendance");
        } else {
            queryAttendance().then((events) => {
                // @ts-ignore
                processEvents(events["events"]);
            })
            setButton("Show Events");
        }
        setAttendance(!attendance);
        hideEditForm();
    }

    function processEvents(events: Event[]) {
        const gs: Group[] = []
        const is: Item[] = []
        for (const event of events) {
            let giduser = -1;
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
        setEditForm(<EditForm key={item.id} submitForm={hideEditForm} end={moment(item.end).format("YYYY-MM-DDTHH:mm")}
                              start={moment(item.start).format("YYYY-MM-DDTHH:mm")}
                              type={item.content} username={username} id={item.id}/>);
    }

    useEffect(() => {
        console.log("querying")
        queryEvents().then((events) => {
            // @ts-ignore
            processEvents(events["events"]);
        })
    }, []);

    return <>
        <div>
            <button onClick={switchView}>{button}</button>
            <CalendarTimeline groups={groups} items={items} eventClick={(item) => showEditEvent(item)}/>
        </div>
        <div>{editForm}</div>
    </>
}