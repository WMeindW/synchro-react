import {SynchroConfig} from "../config/SynchroConfig.ts"
export default function Logout() {
    return <a href={SynchroConfig.apiUrl + "auth/logout"}>Logout</a>;
}