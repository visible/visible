export interface ModuleServer {
  listen(): Promise<void>;
  end(): Promise<void>;
}
