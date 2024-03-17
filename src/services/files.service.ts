import * as fs from "fs";
import {promisify} from "util";
import {IFile} from "../contracts/contracts";
import * as config from "../config.json";

const path = config.files;
const readdir = promisify(fs.readdir);
const read = promisify(fs.readFile);

export class FilesService {
    async getFiles(): Promise<Array<IFile>> {
        const files = await readdir(path);
        if (!files) {
            throw new Error("no file found")
        }

        const result = new Array<IFile>();
        for(var i = 0; i < files.length; i ++) {
            result.push({ name: files[i]});
        }

        return result;  
    }
}