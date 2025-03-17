import AttendanceForm from "../components/AttendanceForm.tsx";
import MotdFrame from "../components/MotdFrame.tsx";
import Logout from "../components/Logout.tsx";
import FileManager from "../components/FileManager.tsx";

export default function Home() {
    return (<div>
        <div className="container">
            <AttendanceForm/>
        </div>
        <hr/>
        <div className="motd-container">
            <MotdFrame/>
        </div>
        <hr/>
        <div className="container">
            <FileManager/>
        </div>
        <hr/>
        <div className="container">
            <Logout/>
        </div>
    </div>);
}