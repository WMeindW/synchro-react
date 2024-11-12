import CreateForm from "./components/CreateForm.tsx";
import {useState} from "react";
import Logout from "./components/Logout.tsx";
import EditForm from "./components/EditForm.tsx";
import moment from 'moment';
import AttendanceForm from "./components/AttendanceForm.tsx";
import Events from "./components/Events.tsx";
import CreateUserForm from "./components/CreateUserForm.tsx";
import UserList from "./components/UserList.tsx"; // Import Moment.js

interface Item {
    id: number,
    group: number,
    content: string,
    start: Date,
    end: Date
}

export default function App() {
    const [editForm, setEditForm] = useState(<div></div>);

    function showEditEvent(item: Item, username: string) {
        setEditForm(<EditForm key={item.id} submitForm={hideEditForm} end={moment(item.end).format("YYYY-MM-DDTHH:mm")}
                              start={moment(item.start).format("YYYY-MM-DDTHH:mm")}
                              type={item.content} username={username} id={item.id}/>);
    }

    function hideEditForm() {
        setEditForm(<div></div>);
    }

    return (
        <>
            <div>
                <AttendanceForm/>
            </div>
            <div>
                <CreateForm submitForm={hideEditForm}/>
            </div>
            <div>
                <Events eventClick={(event, username) => showEditEvent(event, username)}/>
            </div>
            <div>
                {editForm}
            </div>
            <div>
                <CreateUserForm/>
            </div>
            <div>
                <UserList/>
            </div>
            <div>
                <Logout/>
            </div>
        </>
    );
};