import AttendanceForm from "../components/AttendanceForm.tsx";
import MotdFrame from "../components/MotdFrame.tsx";

export default function Home() {
    return (<div>
        <div className="container">
            <AttendanceForm/>
        </div>
        <hr/>
        <div className="container">
            <MotdFrame/>
        </div>
        <hr/>
    </div>);
}