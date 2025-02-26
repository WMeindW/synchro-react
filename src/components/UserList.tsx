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
                    className: "user-card"
                }, <>
                    <svg className={"attendance-clock user-card-icon"} version="1.1" id="Layer_1"
                         xmlns="http://www.w3.org/2000/svg"
                         x="0px" y="0px" viewBox="0 0 122.88 122.66">
                        <rect width="100%" height="100%" fill="#D8C4B6"/>
                        <g>
                            <path fill="#3E5879"
                                  d="M43.84,78.55l9.74,28.64l4.9-17l-2.4-2.63c-1.08-1.58-1.32-2.96-0.72-4.15c1.3-2.57,3.99-2.09,6.5-2.09 c2.63,0,5.89-0.5,6.71,2.8c0.28,1.1-0.07,2.26-0.84,3.44l-2.4,2.63l4.9,17l8.82-28.64c6.36,5.72,25.19,6.87,32.2,10.78 c2.22,1.24,4.22,2.81,5.83,4.93c2.44,3.23,3.94,7.44,4.35,12.79l1.46,9.33c-0.36,3.78-2.5,5.96-6.73,6.29H61.9H6.73 c-4.23-0.32-6.37-2.5-6.73-6.29l1.46-9.33c0.41-5.35,1.91-9.56,4.35-12.79c1.61-2.13,3.61-3.7,5.83-4.93 C18.65,85.42,37.48,84.27,43.84,78.55L43.84,78.55z M39.43,37.56c-1.21,0.05-2.12,0.3-2.74,0.72c-0.36,0.24-0.62,0.55-0.79,0.91 c-0.19,0.4-0.27,0.89-0.26,1.46c0.05,1.66,0.92,3.82,2.59,6.31l0.02,0.04l0,0l5.44,8.66c2.18,3.47,4.47,7.01,7.31,9.61 c2.73,2.5,6.05,4.19,10.44,4.2c4.75,0.01,8.23-1.75,11.04-4.39c2.93-2.75,5.25-6.51,7.53-10.27l6.13-10.1 c1.14-2.61,1.56-4.35,1.3-5.38c-0.16-0.61-0.83-0.91-1.97-0.96c-0.24-0.01-0.49-0.01-0.75-0.01c-0.27,0.01-0.56,0.03-0.86,0.05 c-0.16,0.01-0.32,0-0.47-0.03c-0.55,0.03-1.11-0.01-1.68-0.09l2.1-9.29c-11.21-0.14-18.88-2.09-27.95-7.89 c-2.98-1.9-3.88-4.08-6.86-3.87c-2.25,0.43-4.14,1.44-5.65,3.06c-1.44,1.55-2.53,3.67-3.24,6.38l1.19,10.95 C40.64,37.67,40.01,37.65,39.43,37.56L39.43,37.56z M87.57,35.61c1.51,0.46,2.48,1.42,2.87,2.97c0.44,1.72-0.04,4.13-1.49,7.43l0,0 c-0.03,0.06-0.06,0.12-0.09,0.18l-6.2,10.22c-2.39,3.94-4.82,7.88-8.06,10.92c-3.35,3.14-7.49,5.23-13.14,5.22 c-5.28-0.01-9.25-2.03-12.51-5.01c-3.15-2.88-5.56-6.6-7.85-10.24l-5.44-8.65c-1.99-2.97-3.02-5.68-3.09-7.91 c-0.03-1.05,0.15-2,0.53-2.83c0.41-0.88,1.03-1.61,1.87-2.17c0.39-0.26,0.83-0.49,1.32-0.67c-0.35-4.69-0.49-10.61-0.26-15.56 c0.12-1.17,0.34-2.35,0.67-3.53c1.39-4.97,4.88-8.97,9.2-11.72c1.52-0.97,3.19-1.77,4.95-2.41C61.3-1.95,75.16,0.12,82.58,8.14 c3.02,3.27,4.92,7.61,5.33,13.34L87.57,35.61L87.57,35.61z"/>
                        </g>
                    </svg>
                    <div className={"user-card-block"}>{user.username}</div>
                    <div className={"user-card-block"}>{user.email}</div>
                    <div className={"user-card-block"}>{user.phone}</div>
                    <div className={"user-card-block"}>{user.enabled}</div>
                </>))
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
    return <div className={"user-list"}>{users.users}</div>
}