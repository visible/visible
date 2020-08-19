import { Progress } from '../domain/models';
import { source } from './source';

export const progress = Progress.from({
  doneCount: 1,
  totalCount: 2,
  sources: [source],
});
