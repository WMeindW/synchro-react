export class Parser {
    public static parseUsers() {
        let users: [] = JSON.parse(<string>window.localStorage.getItem('users'));
        let html = "";
        if (users)
            if (users.length > 0){
                html += `<option value="" selected disabled>Choose</option>`;
                for (const u of users) {
                    html += `<option value="${u}">${u}</option>`;
                }
            } else {
                html += `<option value="${this.getUsernameFromCookie()}">${this.getUsernameFromCookie()}</option>`;
            }
        return html;
    }

    public static parseShiftTypes() {
        let types: [] = JSON.parse(<string>window.localStorage.getItem('shiftTypes'));
        let html = "";
        html += `<option value="" selected disabled>Choose</option>`;
        if (types)
            for (const u of types) {
                html += `<option value="${u}">${u}</option>`;
            }
        return html;
    }

    public static parseUserTypes() {
        let types: [] = JSON.parse(<string>window.localStorage.getItem('userTypes'));
        let html = "";
        html += `<option value="" selected disabled>Choose</option>`;
        if (types)
            for (const u of types) {
                html += `<option value="${u}">${u}</option>`;
            }
        return html;
    }

    public static getUsernameFromCookie() {
        let usernameCookie = "";
        for (const c of document.cookie.split(";")) {
            if (c.split("=")[0].trim() == "username") {
                usernameCookie = c.split("=")[1];
            }
        }
        return usernameCookie;
    }
}