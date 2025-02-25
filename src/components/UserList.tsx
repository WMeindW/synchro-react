import React, {ReactElement, useEffect, useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts"
import {Client} from "../service/Client.ts";

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
        return await Client.getJson(SynchroConfig.apiUrl + "admin/query-user");

    }

    function processUsers(users: User[]) {
        let children: ReactElement[] = [];
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
        /*queryUsers().then((usersList) => {
            if (usersList != null)
                // @ts-ignore
                processUsers(usersList["userList"])
        })
         */
        const users: User[] = [
            {
                id: "1",
                email: "john.doe@example.com",
                phone: "+1234567890",
                username: "johndoe",
                role: "admin",
                enabled: "true",
            },
            {
                id: "2",
                email: "jane.smith@example.com",
                phone: "+1987654321",
                username: "janesmith",
                role: "user",
                enabled: "true",
            },
            {
                id: "3",
                email: "michael.brown@example.com",
                phone: "+1478523690",
                username: "michaelb",
                role: "editor",
                enabled: "false",
            },
            {
                id: "4",
                email: "emily.johnson@example.com",
                phone: "+1029384756",
                username: "emilyj",
                role: "user",
                enabled: "true",
            },
            {
                id: "5",
                email: "william.wilson@example.com",
                phone: "+5647382910",
                username: "williamw",
                role: "moderator",
                enabled: "true",
            },
            {
                id: "6",
                email: "olivia.martin@example.com",
                phone: "+9876543210",
                username: "oliviam",
                role: "user",
                enabled: "false",
            },
            {
                id: "7",
                email: "david.lee@example.com",
                phone: "+1597534862",
                username: "davidl",
                role: "admin",
                enabled: "true",
            },
            {
                id: "8",
                email: "sophia.white@example.com",
                phone: "+7531594826",
                username: "sophiaw",
                role: "user",
                enabled: "true",
            },
            {
                id: "9",
                email: "james.taylor@example.com",
                phone: "+3216549870",
                username: "jamest",
                role: "editor",
                enabled: "false",
            },
            {
                id: "10",
                email: "charlotte.harris@example.com",
                phone: "+4561237890",
                username: "charlotteh",
                role: "moderator",
                enabled: "true",
            }
        ];
        processUsers(users);
    }, []);
    return <div className={"container-form"}>{users.users}</div>
}