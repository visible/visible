import { Node } from 'domhandler';
import { promises as fs } from 'fs';
import fetch from 'node-fetch';

import { HTMLRootNode, Source } from '../source';
import { findASTByXPath } from '../utils';
import { AddScriptParams, RunScriptParams } from './session';

export abstract class BaseSession {
  async resolveURL(path: string): Promise<string> {
    if (/.+?:\/\//.test(path)) return path;
    return new URL(path, await this.getURL()).href;
  }

  waitFor(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
  }

  waitForFunction(func: string): Promise<void> {
    return new Promise((resolve) => {
      setInterval(() => {
        const flag = this.eval(`(${func})()`);
        if (flag) resolve();
      }, 1000);
    });
  }

  async findHTML(xpath: string): Promise<[string, Node] | undefined> {
    const source = this.getActiveHTML();

    if (!(source.node instanceof HTMLRootNode)) {
      throw new Error('Malformed node of html source');
    }

    const node = findASTByXPath(source.node.value, xpath);
    if (node == null) return;

    return [source.id, node];
  }

  async runScript<T>(params: string | RunScriptParams): Promise<T> {
    if (typeof params === 'string') {
      return this.eval<T>(params);
    }

    if (params?.content != null) {
      return this.eval<T>(params.content);
    }

    if (params.path != null) {
      const code = await fs.readFile(params.path, 'utf-8');
      return this.eval<T>(code);
    }

    throw new Error(`You must provide either content or path`);
  }

  async addScript(params: AddScriptParams): Promise<void> {
    if (params.url) {
      const javascript = await fetch(params.url).then((res) => res.text());
      await this.runScript({ ...params, content: javascript });
    }

    this.runScript(params);
  }

  abstract getActiveHTML(): Source;
  abstract getURL(): Promise<string>;
  abstract eval<T>(script: string): Promise<T>;
}
