import {SynchroConfig} from "../config/SynchroConfig.ts"

export default function Logout() {
    return (<div className={"container-form"}>
        <svg className={"attendance-clock"} width="2em" height="2em" viewBox="1 1 22 22" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path fill="#D8C4B6" d="M0 0h24v24H0z"/>
                <path fill="#3E5879" d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416zM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </g>
        </svg>
        <a href={SynchroConfig.apiUrl + "auth/logout"}>Logout</a>
    </div>);
}