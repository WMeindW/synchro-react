import {Component} from "react";

export default class Dialog extends Component<any, {
    opened: boolean,
    message: string,
    callback: Function | null,
    buttonText: string,
    firstButton: boolean
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            opened: false,
            message: "",
            callback: null,
            buttonText: "Close",
            firstButton: true
        };
    }

    public open(message: string): void {
        this.setState({opened: true, message: message, buttonText: "Close", callback: null, firstButton: true});
    }

    public openCallback(message: string, callback: Function): void {
        this.setState({opened: true, message: message, callback: callback, firstButton: false});
    }

    public openCallbackMessage(message: string, callback: Function, buttonText: string): void {
        this.setState({opened: true, message: message, callback: callback, buttonText: buttonText, firstButton: true});
    }

    public close(): void {
        this.setState({
            opened: false, message: "", callback: null, buttonText: "Close", firstButton: false
        });
    }

    render() {
        if (this.state.opened) {
            return (
                <div className="dialog-container">
                    <div className="dialog">
                        <div
                            className="dialog-message">{this.state.message.length > 48 ? this.state.message.substring(0, 48) + '...' : this.state.message}</div>
                        <button className={this.state.callback == null ? "hidden" : ""} onClick={() => {
                            this.close();
                            if (this.state.callback)
                                this.state.callback();
                        }}>{this.state.buttonText}
                        </button>
                        <button className={!this.state.firstButton ? "hidden" : ""} onClick={() => {
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