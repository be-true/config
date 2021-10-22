import { configInit } from "../lib";
import { DB, DBConfig } from "./db";
import { ExternalApiClient, ExternalApiClientConfig } from "./external-api-client";
import { Server, ServerConfig } from "./server";

export async function start() {
    // If config has error, application wil be stopped with error report
    await configInit();

    // Usage configuration
    const client = new ExternalApiClient(new ExternalApiClientConfig());
    const db = new DB(new DBConfig());
    const server = new Server(new ServerConfig(), db, client);

    await server.start();
}