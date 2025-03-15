import Logout from "../components/Logout.tsx";
import Events from "../components/Events.tsx";
import CreateForm from "../components/CreateForm.tsx";
import {useState} from "react";


export default function EventsRoute() {
    const [stateKey, setStateKey] = useState(0);
    return (<div>
        <div className="container">
            <CreateForm method={() => {
                setStateKey(stateKey + 1)
            }}/>
        </div>
        <hr/>
        <div className="container">
            <Events stateKey={stateKey}/>
        </div>
        <hr/>
        <div className="container">
            <Logout/>
        </div>
    </div>);
}