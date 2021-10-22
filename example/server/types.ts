export interface IServerConfig {
  appHost: string;
  appPort: number;
  appEnv: string;
  appName?: string;
}

export interface IServer {
  start(): Promise<void>;
}
