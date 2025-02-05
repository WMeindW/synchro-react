import {Component} from "react";

export default class Dialog extends Component<any, { opened: boolean, message: string }> {
    constructor(props: any) {
        super(props);
        this.state = {
            opened: false,
            message: ""
        };
    }

    public open(message: string): void {
        this.setState({opened: true, message: message}); // Update state to trigger re-render
    }

    public close(): void {
        this.setState({opened: false, message: ""}); // Update state to trigger re-render
    }

    render() {
        if (this.state.opened) {
            return (
                <div className="dialog-container">
                    <div className="dialog">
                        <div className="dialog-message">{this.state.message}</div>

                        <button onClick={() => this.close()}>Close</button>
                    </div>
                </div>
            );
        }
        return null;
    }
}