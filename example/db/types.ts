export interface IDBConfig {
    host: string;
    database: string;
    user: string;
    password: string;
}

export interface IDB {
    start(): Promise<void>;
}