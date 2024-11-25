import React, {useState} from "react";

export default function CreateMotd() {
    const [renderedMotd, setRenderedMotd] = useState({__html: ""});
    const [formData, setFormData] = useState({
        motd: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    return <div>
        <div style={{width: "100%", minHeight: "50px", padding:"0",margin: "0", border: "1px solid black", marginBottom: "10px"}}
             dangerouslySetInnerHTML={renderedMotd}></div>
        <input onChange={handleChange} value={formData.motd} type={"textarea"}
               style={{width: "100%", minHeight: "50px",padding:"0", margin: "0", border: "1px solid black", marginBottom: "10px"}}
               placeholder={"Motd..."}></input>
    </div>
}