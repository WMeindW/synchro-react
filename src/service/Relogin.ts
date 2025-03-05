import {SynchroConfig} from "../config/SynchroConfig.ts";

export class Relogin {
    private static reloginAttempts: number = 0;

    public static async runService() {
        while (this.reloginAttempts <= 6) {
            await this.delay(5000);
            try {
                const response = await fetch(SynchroConfig.apiUrl + "auth/login.html", {
                    method: "GET"
                });
                if (response.status == 200) this.reloginAttempts++;
            } catch (error) {
                this.reloginAttempts++;
            }
            console.log("Attempts: " + this.reloginAttempts)
        }
        alert("Relace vypršela!")
        window.location.href = SynchroConfig.apiUrl + "auth/login.html"
    }

    private static async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}