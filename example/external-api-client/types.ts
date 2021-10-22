export interface IExternalApiClientConfig {
  apiHost: string;
  apiToken: string;
}

export interface IExternalApiClient {
  start(): Promise<void>;
}