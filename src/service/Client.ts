import {createRef} from "react";
import Dialog from "../components/Dialog.tsx";

export class Client {
    public static dialog = createRef<Dialog>();

    public static openDialog(message: string) {
        if (this.dialog.current)
            this.dialog.current.open(message);
    }

    public static openDialogCallback(message: string, callback: Function) {
        if (this.dialog.current)
            this.dialog.current.openCallback(message, callback);
    }

    public static async getJson(url: string): Promise<any> {
        try {
            const response = await fetch(url, {
                method: "GET"
            });
            if (response.status != 200) this.openDialog("Error fetching data!");
            return await response.json();
        } catch (error) {
            this.openDialog("Error fetching data!");
            return null;
        }
    }

    public static async getText(url: string): Promise<string> {
        try {
            const response = await fetch(url, {
                method: "GET"
            });
            if (response.status != 200) this.openDialog("Error fetching data!");
            return await response.text();
        } catch (error) {
            this.openDialog("Error fetching data!");
            return "";
        }
    }
}
