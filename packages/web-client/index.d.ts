export interface RenderParams {
  language: string;
  location: string;
  manifest: {
    [K: string]: string;
  };
}
export interface RenderResult {
  statusCode: number;
  staticMarkup: string;
}
export default function render(params: RenderParams): Promise<RenderResult>;
