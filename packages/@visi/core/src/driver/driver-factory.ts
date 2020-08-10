import { Settings } from '../settings';
import { Driver } from './driver';

export interface DriverFactory {
  create(): Promise<Driver>;
}

export interface DriverFactoryConstructor {
  new (settings: Settings): DriverFactory;
}
