import React, {ReactElement, ReactNode, useEffect, useState} from "react";

interface User {
    username: string
    role: string
    enabled: string
}

interface UserList {
    users: User[]
}

export default function UserList() {
    const [users, setUsers] = useState<UserList>({users: []});

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

    function processUsers(users: User[]): ReactElement<any, any> {
        return React.createElement("div")
    }

    useEffect(() => {
        console.log("querying users...");
        queryUsers().then((usersList) => {
            // @ts-ignore
            processUsers(usersList["userList"]);
        })
    }, []);
    return <div>{processUsers(users.users)}</div>
}