import { faClock, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

import { DiagnosisLargeFragment, Status } from '../../generated/graphql';
import { useTranslation } from '../../utils/i18next';
import { Badge, BadgeVariant, Image, Typography } from '../ui';

export interface ProjectProps {
  diagnosis: DiagnosisLargeFragment;
}

const mapVariant = (status: Status): BadgeVariant => {
  switch (status) {
    case Status.Done:
      return 'green';
    case Status.Failed:
      return 'red';
    default:
      return 'yellow';
  }
};

const ImagePlaceholder = () => {
  return (
    <div
      aria-hidden
      className="bg-gray-400 animate-pulse rounded-md shadow-md"
      style={{ width: '300px', height: '225px' }}
    />
  );
};

type StatusBadgeProps = {
  status: Status;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { t } = useTranslation();
  const variant = mapVariant(status);

  const text = {
    [Status.Done]: t('status.done', 'Done'),
    [Status.Failed]: t('status.failed', 'Failed'),
    [Status.Processing]: t('status.processing', 'Processing'),
    [Status.Queued]: t('status.queued', 'Queued'),
    [Status.Started]: t('status.started', 'Started'),
  }[status];

  return (
    <Badge
      role="status"
      aria-live="polite"
      aria-label={t('status.description', 'Diagnosis status: {{status}}', {
        status: text,
      })}
      variant={variant}
    >
      {text}
    </Badge>
  );
};

const Statuses = ({ diagnosis }: { diagnosis: DiagnosisLargeFragment }) => {
  const { t } = useTranslation();
  const createdAt = new Date(diagnosis.createdAt);

  return (
    <div className="flex flex-col space-y-2 mb-4 md:flex-row md:space-x-8 md:space-y-0">
      <StatusBadge status={diagnosis.status} />

      <Typography
        color="wash"
        fontSize="sm"
        className="inline-flex items-center space-x-1"
      >
        <FontAwesomeIcon icon={faLink} />

        <a
          className="text-primary-500 hover:underline"
          href={diagnosis.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {diagnosis.url}
        </a>
      </Typography>

      <Typography
        color="wash"
        fontSize="sm"
        className="inline-flex items-center space-x-1"
      >
        <FontAwesomeIcon icon={faClock} />

        <time
          dateTime={createdAt.toISOString()}
          aria-label={t('diagnoses.created_at', 'Created at {{date}}', {
            date: createdAt.toLocaleString(),
          })}
        >
          {createdAt.toLocaleString()}
        </time>
      </Typography>
    </div>
  );
};

export const Project = (props: ProjectProps) => {
  const { diagnosis } = props;
  const { t } = useTranslation();

  const domain = new URL(diagnosis.url).hostname;

  return (
    <div
      className={classNames(
        'flex',
        'flex-col',
        'w-full',
        'md:justify-between',
        'md:items-center',
        'md:flex-row',
      )}
    >
      <div className={classNames('flex-1')}>
        <Typography variant="h2" fontSize="4xl">
          {domain}
        </Typography>
        <Statuses diagnosis={diagnosis} />
      </div>

      {diagnosis.screenshot != null ? (
        <Image
          src={diagnosis.screenshot}
          alt={t('diagnoses.screenshot', 'Screenshot for {{title}}', {
            title: domain,
          })}
          width="300px"
          variant="shadow"
        />
      ) : (
        <ImagePlaceholder />
      )}
    </div>
  );
};
