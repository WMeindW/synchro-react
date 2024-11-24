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
        <div style={{minWidth: "100vw", height: "auto", border: "2px solid black", marginBottom: "50px"}}
             dangerouslySetInnerHTML={renderedMotd}></div>
        <input onChange={handleChange} value={formData.motd} type={"textarea"}
               style={{minWidth: "100vw", height: "auto", border: "2px solid black", marginBottom: "50px"}}
               placeholder={"Motd..."}></input>
    </div>
}