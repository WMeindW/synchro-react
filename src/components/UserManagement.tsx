import UserList from "./UserList.tsx";
import {useState} from "react";
import UserEditForm from "./UserEditForm.tsx";

interface User {
    id: string
    email: string
    phone: string
    username: string
    role: string
    enabled: string
}

export default function UserManagement() {
    const [editForm, setEditForm] = useState(<div></div>);

    const showEditForm = (user: User) => {
        setEditForm(<UserEditForm user={user}/>)
    }
    return <div className={"container-form"}>
        <UserList userClick={(user) => showEditForm(user)}/>
        {editForm}
    </div>
}