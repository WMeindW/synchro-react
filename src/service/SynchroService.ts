export class SynchroService {
    public static parseUsers() {
        let users:[] = JSON.parse(<string>window.localStorage.getItem('users'));
        let html = "";
        for (const u of users) {
            html += `<option value="${u}">${u}</option>`;
        }
        return html;
    }

    public static parseShiftTypes() {
        let types:[] = JSON.parse(<string>window.localStorage.getItem('shiftTypes'));
        let html = "";
        for (const u of types) {
            html += `<option value="${u}">${u}</option>`;
        }
        return html;
    }

    public static parseUserTypes() {
        let types:[] = JSON.parse(<string>window.localStorage.getItem('userTypes'));
        let html = "";
        for (const u of types) {
            html += `<option value="${u}">${u}</option>`;
        }
        return html;
    }
}