import { faClock, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

import { DiagnosisLargeFragment, Status } from '../../generated/graphql';
import { useTranslation } from '../../utils/i18next';
import { Badge, Image, Typography } from '../ui';

export interface ProjectProps {
  diagnosis: DiagnosisLargeFragment;
}

const Statuses = ({ diagnosis }: { diagnosis: DiagnosisLargeFragment }) => {
  const { t } = useTranslation();
  const createdAt = new Date(diagnosis.createdAt);

  const variant =
    diagnosis.status === Status.Done
      ? 'green'
      : diagnosis.status === Status.Failed
      ? 'red'
      : 'yellow';

  return (
    <div className="flex flex-col space-y-2 mb-4 md:flex-row md:space-x-8 md:space-y-0">
      <Badge variant={variant}>
        {t(`status.${diagnosis.status.toLowerCase()}`)}
      </Badge>

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

        <time dateTime={createdAt.toISOString()}>
          {createdAt.toLocaleString()}
        </time>
      </Typography>
    </div>
  );
};

export const Project = (props: ProjectProps) => {
  const { diagnosis } = props;

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

      {diagnosis.screenshot && (
        <Image
          src={diagnosis.screenshot}
          alt={diagnosis.id}
          width="300px"
          variant="shadow"
        />
      )}
    </div>
  );
};
