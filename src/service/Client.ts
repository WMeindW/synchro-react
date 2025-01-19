export class Client {
    public static async getJson(url: string): Promise<any> {
        try {
            const response = await fetch(url, {
                method: "GET"
            });
            if (response.status != 200) alert("Error fetching: " + url);
            return await response.json();
        } catch (error) {
            alert("Error fetching: " + url);
            return null;
        }
    }

    public static async getText(url: string): Promise<string> {
        try {
            const response = await fetch(url, {
                method: "GET"
            });
            return await response.text();
        } catch (error) {
            alert("Error fetching: " + url);
            return "";
        }
    }
}
