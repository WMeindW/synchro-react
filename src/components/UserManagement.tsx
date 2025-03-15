import UserList from "./UserList.tsx";
import {useEffect, useState} from "react";
import UserEditForm from "./UserEditForm.tsx";

interface User {
    id: string
    email: string
    phone: string
    username: string
    role: string
    enabled: string
}

export default function UserManagement(props: { stateKey: number }) {
    const [editForm, setEditForm] = useState(<div></div>);
    const [stateKey, setStateKey] = useState({stateKey: 0});

    const showEditForm = (user: User) => {
        setEditForm(<UserEditForm user={user}
                                  submit={() => {
                                      setStateKey({...stateKey, stateKey: stateKey.stateKey - 3})
                                      setEditForm(<div></div>);
                                  }}/>)
    }
    useEffect(() => {
        setEditForm(<div></div>);
        setStateKey({...stateKey, stateKey: stateKey.stateKey + 2});
    }, [props.stateKey]);
    return <div className={"container-form user-edit-form-container"}>
        <UserList userClick={(user) => showEditForm(user)} stateKey={stateKey}/>
        {editForm}
    </div>
}