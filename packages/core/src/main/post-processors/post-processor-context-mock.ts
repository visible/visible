import { client } from '../../__mocks__/cdp';
import { DriverMock } from '../driver/driver-mock';
import { SourceStoreMock } from '../source-store/source-store-mock';
import { PostProcessorContext } from './post-processor';

export const context: PostProcessorContext = {
  cdp: client,
  config: {},
  driver: new DriverMock(),
  sourceStore: new SourceStoreMock(),
};
