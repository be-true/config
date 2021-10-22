import { IServer, IServerConfig } from "./types";
import { DB } from "../db";
import { IExternalApiClient } from "../external-api-client";

export class Server implements IServer {
  constructor(
    private config: IServerConfig,
    private db: DB,
    private client: IExternalApiClient
  ) {}
  async start() {
    await this.db.start();
    await this.client.start();
  }
}
