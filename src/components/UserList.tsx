import React, {ReactElement, useEffect, useState} from "react";

interface User {
    id: string
    email: string
    phone: string
    username: string
    role: string
    enabled: string
}

interface UserList {
    users: User[]
}

interface Props {
    userClick: (user: User) => void;
}

export default function UserList(props: Props) {
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
                children.push(React.createElement("div", {
                    onClick: () => props.userClick(user),
                    key: user.id,
                    style: {border: "1px solid black", padding: "20px", margin: "10px"}
                }, user.username + " " + user.email + " " + user.phone + " " + user.enabled + " " + user.id))
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