import React from 'react';

import { SourceLargeFragment } from '../../generated/graphql';
import { Source } from '../source';

const SourcePlaceholder = () => {
  return (
    <div
      aria-hidden
      className="bg-gray-300 w-full h-4 rounded mb-2 animate-pulse"
    />
  );
};

export interface SourceListProps {
  diagnosisId: string;
  sources: SourceLargeFragment[];
  withFailCount: boolean;
  loading: boolean;
}

export const SourceList = (props: SourceListProps) => {
  const { diagnosisId, sources, withFailCount, loading } = props;

  if (loading) {
    return (
      <div>
        {Array.from({ length: 3 }, (_, i) => (
          <SourcePlaceholder key={`item-${i}`} />
        ))}
      </div>
    );
  }

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

SourceList.defaultProps = {
  loading: false,
  withFailCount: false,
};
