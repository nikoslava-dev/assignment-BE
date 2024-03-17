import * as fs from "fs";
import {promisify} from "util";
import {ITable} from "../contracts/contracts";
import * as config from "../config.json";

const path = config.files;
const read = promisify(fs.readFile);

export class TablesService {
    
    async getTables(file: string): Promise<Array<ITable>> {
        const data = await read(`${path}\\${file}`, 'utf8');
        if (!data) {
            throw new Error(`no tables found in ${file}`);
        }

        return JSON.parse(data).tables;
    }

    async getTable(file: string, table: string): Promise<ITable> {
        const data = await read(`${path}\\${file}`, 'utf8');
        console.log("mydata", data)
        if (!data) {
            throw new Error(`no tables in ${file} found`);
        }

        const tableInfo = JSON.parse(data).tables.find(x => x.title === table);
        console.log("mytable", tableInfo)
        if (!tableInfo){
            throw new Error(`no table with title ${table} found in ${file}`);
        }

        return tableInfo;
    }
}