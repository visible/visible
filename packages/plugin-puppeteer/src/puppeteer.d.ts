import 'puppeteer';

import { Protocol } from 'devtools-protocol/types/protocol';

declare module 'puppeteer' {
  export interface CDPSession {
    detach(): Promise<void>;

    //-----------------------------
    // DOM
    //-----------------------------
    send(method: 'DOM.enable'): Promise<void>;
    send(
      method: 'DOM.getDocument',
      params: Protocol.DOM.GetDocumentRequest,
    ): Promise<Protocol.DOM.GetDocumentResponse>;

    //-----------------------------
    // CSS
    //-----------------------------
    send(method: 'CSS.enable'): Promise<void>;
    send(
      method: 'CSS.getStyleSheetText',
      params: Protocol.CSS.GetStyleSheetTextRequest,
    ): Promise<Protocol.CSS.GetStyleSheetTextResponse>;
    send(
      method: 'CSS.getMatchedStylesForNode',
      params: Protocol.CSS.GetMatchedStylesForNodeRequest,
    ): Promise<Protocol.CSS.GetMatchedStylesForNodeResponse>;

    on(
      method: 'CSS.styleSheetAdded',
      cb: (e: Protocol.CSS.StyleSheetAddedEvent) => void,
    ): void;
  }
}
