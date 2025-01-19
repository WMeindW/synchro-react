export class Client {
    public static async getJson(url: string) {
        try {
            const response = await fetch(url, {
                method: "GET"
            });
            return await response.json();
        } catch (error) {
            alert("Error fetching: " + url);
            return null;
        }
    }

    public static async getText(url: string) {
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
