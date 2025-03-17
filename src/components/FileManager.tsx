import React, {MouseEventHandler, useEffect, useState} from 'react'
import {Client} from "../service/Client.ts";
import {SynchroConfig} from "../config/SynchroConfig.ts";
import {Parser} from "../service/Parser.ts";

interface FileObject {
    name: string
    size: number
    isUploaded: boolean
    file: File | null
}

interface FileUploaded {
    fileName: string
    size: number
}

export default function FileManager() {
    const fs: FileObject[] = [];
    const [files, setFiles] = useState({f: fs});
    const [username, setUsername] = useState({u: "admin_user"});

    useEffect(() => {
        fetchFiles().then((files: FileUploaded[]) => processFetchedFiles(files));
    }, []);

    useEffect(() => {
        console.log(files.f)
    }, [files]);

    function processFiles(fileList: FileList) {
        const fss: FileObject[] = files.f;
        Array.from(fileList).forEach(file => {
            if (!fss.find((f1) => f1.name == file.name)) {
                fss.push({name: file.name, size: file.size, isUploaded: false, file: file});
            } else {
                Client.openDialog("File with this name already exists!")
            }
        });
        setFiles({...files, f: fss});
    }

    async function fetchFiles() {
        return await Client.getJson(SynchroConfig.apiUrl + "files/query?username=" + username.u);
    }

    function processFetchedFiles(fs: FileUploaded[]) {
        const fss: FileObject[] = [];
        for (const f of fs) {
            if (fss.find((f1) => f1.name == f.fileName)) continue;
            fss.push({name: f.fileName, size: f.size, isUploaded: true, file: null});
        }
        setFiles({...files, f: fss});
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fs = files.f.filter((file) => !file.isUploaded);
        for (const f of fs) {
            const formData = new FormData();
            if (!f.file) continue;
            formData.append("file", new Blob([f.file], {type: f.file?.type}), f.name)
            formData.append("username", username.u);
            fetch(SynchroConfig.apiUrl + "files/upload", {
                method: "POST",
                body: formData
            })
                .then((response) => {
                    if (response.status != 200) {
                        Client.openDialog("Error uploading file!")
                        return;
                    }
                    const setF = files.f.find((file) => file.name == f.name);
                    if (setF)
                        setF.isUploaded = true;
                    setFiles({...files, f: files.f});
                })
                .catch(() => {
                    Client.openDialog("Error uploading file!")
                    return;
                });
        }

    };

    function handleDelete(fileName: string) {
        Client.openDialogCallbackMessage("Are you sure you want to delete " + fileName + "?", () => {
            const ft = files.f.find((f1) => f1.name == fileName);
            if (!ft) return;
            if (!ft.isUploaded) {
                const setF = files.f.filter((file) => file.name !== fileName);
                setFiles({...files, f: setF});
                return;
            }
            fetch(SynchroConfig.apiUrl + "files/delete?file=" + fileName + "&username=" + username.u, {
                method: "GET",
            })
                .then((response) => {
                    if (response.status != 200) {
                        Client.openDialog("Error deleting file!")
                        return;
                    }
                    const setF = files.f.filter((file) => file.name !== fileName);
                    setFiles({...files, f: setF});
                })
                .catch(() => {
                    Client.openDialog("Error deleting file!")
                    return;
                });
        }, "Delete");
    }

    function handleDownload(fileName: string) {

    }

    return (<div className={"container-form"}>
            <form onSubmit={handleSubmit} style={{margin: 0}} method={"POST"} className={"container-form"}>
                <label className={"file-input"} htmlFor="fileInput">Choose File</label>
                <input id={"fileInput"} type="file" multiple={true} onChange={(e) => {
                    if (!e.target.files) return;
                    processFiles(e.target.files);
                }}/>
                <select required={true}
                        dangerouslySetInnerHTML={{__html: Parser.parseUsers()}} name="username"
                        value={username.u} onChange={(e) => {
                    setUsername({u: e.target.value});
                }}>
                </select>
                <button type="submit">Upload</button>
            </form>
            <div className={"file-container"}>
                {files.f.map((file, index) => (
                    <div className={"file-action-container"}>
                        <div id={file.name} className={"file-card"} key={index} onClick={() => handleDelete(file.name)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                <path fill="#D8C4B6"
                                      d="M 30.398438 2 L 7 2 L 7 48 L 43 48 L 43 14.601563 Z M 30 15 L 30 4.398438 L 40.601563 15 Z"/>
                            </svg>
                            <div
                                className={"file-name"}>{file.name.length > 24 ? file.name.substring(0, 24) + '...' : file.name}
                            </div>
                        </div>
                        <a className={!file.isUploaded ? "hidden" : ""}
                           href={SynchroConfig.apiUrl + "files/get?file=" + file.name + "&username=" + username.u}>Download</a>
                    </div>

                ))}
            </div>
        </div>
    )
}