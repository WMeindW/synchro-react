import {createRef} from "react";
import Dialog from "../components/Dialog.tsx";

export class Client {
    public static dialog = createRef<Dialog>();

    private static openDialog() {
        if (this.dialog.current)
            this.dialog.current.open();
    }

    public static async getJson(url: string): Promise<any> {
        try {
            const response = await fetch(url, {
                method: "GET"
            });
            if (response.status != 200) this.openDialog();
            return await response.json();
        } catch (error) {
            this.openDialog();
            return null;
        }
    }

    public static async getText(url: string): Promise<string> {
        try {
            const response = await fetch(url, {
                method: "GET"
            });
            if (response.status != 200) this.openDialog();
            return await response.text();
        } catch (error) {
            this.openDialog();
            return "";
        }
    }
}
