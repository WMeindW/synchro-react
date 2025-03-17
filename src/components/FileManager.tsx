import {useEffect, useState} from 'react'
import 'filepond/dist/filepond.min.css'
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

    return (<>
            <form method={"POST"} className={"container-form"}>
                <input type="file" multiple={true} onChange={(e) => {
                    if (!e.target.files) return;
                    processFiles(e.target.files);
                }}/>
                <button type="submit">Upload</button>
            </form>
            <div>
                {files.f.map((file, index) => (
                    <div key={index}>
                        {file.name} - {file.size} bytes - {file.isUploaded ? 'Uploaded' : 'Pending'}
                    </div>
                ))}
            </div>
        </>
    )
}