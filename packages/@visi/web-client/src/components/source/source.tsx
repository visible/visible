import { faCss3, faHtml5 } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import { Outcome, SourceLargeFragment } from '../../generated/graphql';
import { Hidden, Typography } from '../ui';

// TODO: Move to backend
const filename = (url: string) => {
  const names = url.split('/');
  return '/' + names[names.length - 1];
};

// TODO: Add Type field
const mapIcon = (url: string) => {
  if (/\.css$/.test(url)) {
    return <FontAwesomeIcon icon={faCss3} fixedWidth />;
  }

  return <FontAwesomeIcon icon={faHtml5} fixedWidth />;
};

export interface SourceProps {
  source: SourceLargeFragment;
  diagnosisId: string;
  withFileIcon?: boolean;
  withFailCount?: boolean;
}

export const Source = (props: SourceProps) => {
  const { source, withFailCount, withFileIcon, diagnosisId } = props;
  const icon = mapIcon(source.url);

  return (
    <div className={classNames('flex', 'items-center')}>
      <Link
        href="/diagnoses/[diagnosis_id]/files/[file_id]"
        as={`/diagnoses/${diagnosisId}/files/${source.id}`}
      >
        <a className={classNames('hover:underline', 'flex-1')}>
          {withFileIcon && icon}
          <Typography variant="code">{filename(source.url ?? '')}</Typography>
        </a>
      </Link>

      {withFailCount && (
        <div
          className={classNames(
            'text-white',
            'bg-red-500',
            'rounded-full',
            'flex',
            'justify-center',
            'items-center',
            'text-xs',
            'w-5',
            'h-5',
          )}
        >
          <Hidden>Reports count:</Hidden>
          {
            source.reports.filter((report) => report.outcome === Outcome.Fail)
              .length
          }
        </div>
      )}
    </div>
  );
};