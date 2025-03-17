import React, {useEffect, useState} from 'react'
import {Client} from "../service/Client.ts";
import {SynchroConfig} from "../config/SynchroConfig.ts";

interface File {
    name: string
    size: number
    isUploaded: boolean
}

interface FileUploaded {
    fileName: string
    size: number
}

export default function FileManager() {
    const fs: File[] = [];
    const [files, setFiles] = useState({f: fs});
    useEffect(() => {
        fetchFiles().then((files: FileUploaded[]) => processFetchedFiles(files));
    }, []);

    useEffect(() => {
        console.log(files.f)
    }, [files]);

    function processFiles(fileList: FileList) {
        const fss: File[] = files.f;
        Array.from(fileList).forEach(file => {
            if (!fss.find((f1) => f1.name == file.name))
                fss.push({name: file.name, size: file.size, isUploaded: false});
            else {
                Client.openDialog("File with this name already exists!")
            }
        });
        setFiles({...files, f: fss});
    }

    async function fetchFiles() {
        return await Client.getJson(SynchroConfig.apiUrl + "files/query?username=" + "admin_user");
    }

    function processFetchedFiles(fs: FileUploaded[]) {
        const fss: File[] = files.f;
        console.log(fs);
        for (const f of fs) {
            if (fss.find((f1) => f1.name == f.fileName)) continue;
            fss.push({name: f.fileName, size: f.size, isUploaded: true});
        }
        setFiles({...files, f: fss});
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch(SynchroConfig.apiUrl + "user/edit-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
            .then((response) => {
                if (response.status != 200) Client.openDialog("Error editing event!")
            })
            .catch(() => Client.openDialog("Error editing event!"));
    };

    return (<div className={"container-form"}>
            <form onSubmit={handleSubmit} style={{margin: 0}} method={"POST"} className={"container-form"}>
                <label className={"file-input"} htmlFor="fileInput">Choose File</label>
                <input id={"fileInput"} type="file" multiple={true} onChange={(e) => {
                    if (!e.target.files) return;
                    processFiles(e.target.files);
                }}/>
                <button type="submit">Upload</button>
            </form>
            <div className={"file-container"}>
                {files.f.map((file, index) => (
                    <div className={"file-card"} key={index}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                            <path fill="#D8C4B6"
                                  d="M 30.398438 2 L 7 2 L 7 48 L 43 48 L 43 14.601563 Z M 30 15 L 30 4.398438 L 40.601563 15 Z"/>
                        </svg>
                        <div
                            className={"file-name"}>{file.name.length > 8 ? file.name.substring(0, 8) + '...' : file.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}