import AttendanceForm from "../components/AttendanceForm.tsx";
import CreateForm from "../components/CreateForm.tsx";
import CreateUserForm from "../components/CreateUserForm.tsx";

export default function Home() {
    return (<div>
        <div className="container">
            <AttendanceForm/>
        </div>
        <hr/>
        <div className="container">
            <CreateForm/>
        </div>
        <hr/>
        <div className="container">
            <CreateUserForm/>
        </div>
    </div>);
}