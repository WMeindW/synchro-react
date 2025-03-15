import Logout from "../components/Logout.tsx";
import CreateUserForm from "../components/CreateUserForm.tsx";
import UserManagement from "../components/UserManagement.tsx";
import {useState} from "react";

export default function Users() {
    const [stateKey, setStateKey] = useState(0);

    return (<div>
        <div className="container">
            <CreateUserForm method={() => {
                setStateKey(stateKey + 4);
            }}/>
        </div>
        <hr/>
        <div className="container">
            <UserManagement stateKey={stateKey}/>
        </div>
        <hr/>
        <div className="container">
            <Logout/>
        </div>
    </div>);
}