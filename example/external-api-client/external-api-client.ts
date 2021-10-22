import { IExternalApiClient, IExternalApiClientConfig } from "./types";

export class ExternalApiClient implements IExternalApiClient {
    constructor(private config: IExternalApiClientConfig) {}
    async start() {}
}