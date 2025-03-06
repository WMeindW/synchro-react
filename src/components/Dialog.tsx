import {Component} from "react";

export default class Dialog extends Component<any, { opened: boolean, message: string, callback: Function }> {
    constructor(props: any) {
        super(props);
        this.state = {
            opened: false,
            message: "",
            callback: () => console.log("Closed")
        };
    }

    public open(message: string): void {
        this.setState({opened: true, message: message});
    }

    public openCallback(message: string, callback: Function): void {
        this.setState({opened: true, message: message, callback: callback});
    }

    public close(): void {
        this.setState({opened: false, message: ""});
    }

    render() {
        if (this.state.opened) {
            return (
                <div className="dialog-container">
                    <div className="dialog">
                        <div className="dialog-message">{this.state.message}</div>

                        <button onClick={() => {
                            this.close();
                            this.state.callback();
                        }}>Close
                        </button>
                    </div>
                </div>
            );
        }
        return null;
    }
}