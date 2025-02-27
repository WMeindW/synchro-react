import Logout from "../components/Logout.tsx";
import Events from "../components/Events.tsx";
import CreateForm from "../components/CreateForm.tsx";


export default function EventsRoute() {
    return (<div>
        <div className="container">
            <CreateForm/>
        </div>
        <hr/>
        <div className="container">
            <Events/>
        </div>
        <hr/>
        <div className="container">
            <Logout/>
        </div>
    </div>);
}