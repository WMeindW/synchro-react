import Logout from "../components/Logout.tsx";
import CreateUserForm from "../components/CreateUserForm.tsx";
import UserManagement from "../components/UserManagement.tsx";

export default function Users() {
    return (<div>
        <div className="container">
            <CreateUserForm/>
        </div>
        <hr/>
        <div className="container">
            <UserManagement/>
        </div>
        <hr/>
        <div className="container">
            <Logout/>
        </div>
    </div>);
}