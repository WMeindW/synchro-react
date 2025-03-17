import {Component} from "react";

export default class Dialog extends Component<any, {
    opened: boolean,
    message: string,
    callback: Function | null,
    buttonText: string
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            opened: false,
            message: "",
            callback: null,
            buttonText: "Close"
        };
    }

    public open(message: string): void {
        this.setState({opened: true, message: message, buttonText: "Close"});
    }

    public openCallback(message: string, callback: Function): void {
        this.setState({opened: true, message: message, callback: callback});
    }

    public openCallbackMessage(message: string, callback: Function, buttonText: string): void {
        this.setState({opened: true, message: message, callback: callback, buttonText: buttonText});
    }

    public close(): void {
        this.setState({
            opened: false, message: "", callback: null, buttonText: "Close"
        });
    }

    render() {
        if (this.state.opened) {
            return (
                <div className="dialog-container">
                    <div className="dialog">
                        <div className="dialog-message">{this.state.message.length > 48 ? this.state.message.substring(0, 48) + '...' : this.state.message}</div>

                        <button hidden={this.state.callback == null} onClick={() => {
                            this.close();
                            if (this.state.callback)
                                this.state.callback();
                        }}>{this.state.buttonText}
                        </button>
                        <button onClick={() => {
                            this.close();
                        }}>Close
                        </button>
                    </div>
                </div>
            );
        }
        return null;
    }
}