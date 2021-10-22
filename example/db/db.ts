import { IDBConfig, IDB } from "./types";

export class DB implements IDB {
    constructor(private config: IDBConfig) {}
    async start() {}
}