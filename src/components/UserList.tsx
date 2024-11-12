import React, {ReactElement, useEffect, useState} from "react";

interface User {
    id: string
    username: string
    role: string
    enabled: string
}

interface UserList {
    users: User[]
}

export default function UserList() {
    const [users, setUsers] = useState({users: [<div key={0}></div>]});

    async function queryUsers(): Promise<UserList[]> {
        try {
            const response = await fetch("http://localhost:8083/admin/query-user", {
                method: "GET"
            });
            return await response.json();
        } catch (error) {
            console.error("Error fetching users:", error);
            return [];
        }
    }

    function processUsers(users: User[]) {
        let children: ReactElement[] = [];
        console.log(users);
        if (users)
            users.forEach(user => {
                children.push(React.createElement("div", {key: user.id}, user.username + " " + user.enabled + " " + user.id))
            })
        setUsers({...users, users: children});

    }

    useEffect(() => {
        console.log("querying users...");
        queryUsers().then((usersList) => {
            // @ts-ignore
            processUsers(usersList["userList"])
        })
    }, []);
    return <div><br/>{users.users}<br/></div>
}