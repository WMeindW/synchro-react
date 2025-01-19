import {Component} from "react";

export default class Dialog extends Component<any, { opened: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            opened: false, // Manage `opened` in state
        };
    }

    public open(): void {
        this.setState({ opened: true }); // Update state to trigger re-render
    }

    public close(): void {
        this.setState({ opened: false }); // Update state to trigger re-render
    }

    render() {
        if (this.state.opened) {
            return (
                <div className="dialog-container">
                    <div className="dialog">
                        This is a dialog!
                        <button onClick={() => this.close()}>Close</button>
                    </div>
                </div>
            );
        }
        return null;
    }
}