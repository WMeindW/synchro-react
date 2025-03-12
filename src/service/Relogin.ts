import {SynchroConfig} from "../config/SynchroConfig.ts";
import {Client} from "./Client.ts";

export class Relogin {
    private static loginAttempts: number = 0;

    public static async runService() {
        while (this.loginAttempts <= 6) {
            await this.delay(5000);
            try {
                const response = await fetch(SynchroConfig.apiUrl + "auth/login.html", {
                    method: "GET",
                    redirect: "manual"
                });
                if (response.status == 200) this.loginAttempts++;
            } catch (error) {
                this.loginAttempts++;
            }
            console.log("Attempts: " + this.loginAttempts)
        }
        Client.openDialogCallback("Session expired, login again!", () => window.location.href = SynchroConfig.apiUrl + "auth/login.html");
    }

    private static async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}