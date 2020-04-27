import { Config } from '../shared';
import { PostProcessorConstructor } from './post-processors';

export interface PluginMain {
  readonly config?: Config;
  readonly postProcessors?: PostProcessorConstructor[];
}
