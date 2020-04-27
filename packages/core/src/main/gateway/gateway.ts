import path from 'path';

import { Report } from '../../shared';
import { ListRules, OnReady, ProcessRule } from '../../shared/gateway';
import { Driver, SerializableFunction } from '../driver';
import { Serializable, serialize as s } from '../utils/serialize';

export type Declarable = Serializable | SerializableFunction;
const isFunc = (fn: unknown): fn is SerializableFunction =>
  typeof fn === 'function';

export class Gateway {
  private readonly namespace = '__VISIBLE_GATEWAY__';
  private readonly distDir = path.resolve(__dirname, '../gateway/index.js');

  constructor(private readonly driver: Driver) {}

  async prepare() {
    await this.driver.addScriptTag({ path: this.distDir });
    await this.driver.waitForFunction(s`() => ${this.namespace} != null`);
  }

  async declare(store: { [key: string]: Declarable }) {
    for (const [name, value] of Object.entries(store)) {
      if (isFunc(value)) {
        await this.driver.exposeFunction(name, value);
      } else {
        await this.driver.run(name + s`=${value}`);
      }
    }
  }

  onReady: OnReady = () => {
    return this.driver.run<void>(`${this.namespace}.onReady()`);
  };

  listRules: ListRules = () => {
    return this.driver.run<string[]>(`${this.namespace}.listRules()`);
  };

  processRule: ProcessRule = (name: string) => {
    return this.driver.run<Report[]>(this.namespace + s`.processRule(${name})`);
  };
}
