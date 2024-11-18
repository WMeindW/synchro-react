import CreateForm from "./components/CreateForm.tsx";
import Logout from "./components/Logout.tsx";
import AttendanceForm from "./components/AttendanceForm.tsx";
import Events from "./components/Events.tsx";
import CreateUserForm from "./components/CreateUserForm.tsx";
import UserManagement from "./components/UserManagement.tsx";
import MotdFrame from "./components/MotdFrame.tsx";

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
                <UserManagement/>
            </div>
            <div>
                <MotdFrame/>
            </div>
            <div>
                <Logout/>
            </div>
        </>
    );
};