import React from 'react';

import { SourceLargeFragment } from '../../generated/graphql';
import { Source } from '../source';

export interface SourceListProps {
  diagnosisId: string;
  sources: SourceLargeFragment[];
  withFailCount: boolean;
}

export const SourceList = (props: SourceListProps) => {
  const { diagnosisId, sources, withFailCount } = props;

  return (
    <ul>
      {sources.map((source, i) => (
        <li key={`${source.id}-${i}`} className="mb-2">
          <Source
            source={source}
            diagnosisId={diagnosisId}
            withFailCount={withFailCount}
          />
        </li>
      ))}
    </ul>
  );
};
