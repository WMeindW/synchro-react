import CreateForm from "./components/CreateForm.tsx";
import Logout from "./components/Logout.tsx";
import AttendanceForm from "./components/AttendanceForm.tsx";
import Events from "./components/Events.tsx";
import CreateUserForm from "./components/CreateUserForm.tsx";
import UserList from "./components/UserList.tsx"; // Import Moment.js

export default function App() {

    return (
        <>
            <div>
                <AttendanceForm/>
            </div>
            <div>
                <CreateForm/>
            </div>
            <div>
                <Events/>
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