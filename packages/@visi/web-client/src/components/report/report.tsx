import classNames from 'classnames';
import React, { useState } from 'react';
import ReactGA from 'react-ga';

import {
  Difficulty,
  Impact,
  Outcome,
  ReportLargeFragment,
} from '../../generated/graphql';
import { useTranslation } from '../../utils/i18next';
import {
  Badge,
  BadgeVariant,
  CodeFrame,
  DiffCodeFrame,
  Image,
  Typography,
} from '../ui';
import { OutcomeIcon } from './outcome';
import { Reference } from './reference';
import { Status } from './status';

export interface ReportProps {
  original: string;
  url: string;
  report: ReportLargeFragment;
  diagnosisId: string;
  withEditor?: boolean;
  withKeywords?: boolean;
}

const mapImpact = (impact?: Impact | null): BadgeVariant => {
  switch (impact) {
    case Impact.Critical:
      return 'purple';
    case Impact.Serious:
      return 'red';
    case Impact.Minor:
      return 'yellow';
    default:
      return 'grey';
  }
};

const mapDifficulty = (difficulty?: Difficulty | null): BadgeVariant => {
  switch (difficulty) {
    case Difficulty.Difficult:
      return 'red';
    case Difficulty.Medium:
      return 'yellow';
    case Difficulty.Easy:
      return 'green';
    default:
      return 'grey';
  }
};

export const Report = ({ report, original, url, withEditor }: ReportProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const impactVariant = mapImpact(report.impact);
  const difficultyVariant = mapDifficulty(report.difficulty);

  const detailsId = `${report.id}-details`;
  const wrapper = classNames('space-y-2');

  const content = classNames(
    'group',
    'flex',
    'items-center',
    'p-2',
    'pl-10',
    'space-x-8',
    'rounded-md',
    'cursor-pointer',
    'hover:bg-gray-200',
  );

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    ReactGA.event({
      category: 'reports',
      action: open ? 'collapse' : 'expand',
      label: report.rule.name,
    });

    setOpen(!open);
  };

  return (
    <div className={wrapper}>
      <div className={content}>
        <div className="flex-1 relative">
          <OutcomeIcon outcome={report.outcome} />

          <button
            className="hover:text-primary-500 hover:underline w-full text-left"
            title={
              open
                ? t('report.collapsed', 'Click to hide the detail')
                : t('report.expand', 'Click to show the detail')
            }
            onClick={handleClick}
            aria-controls={detailsId}
            aria-expanded={open}
          >
            <Typography className="mb-1" variant="h4" fontSize="lg" lang="en">
              {report.rule.name}
            </Typography>
          </button>

          <Typography
            fontStyle={report.message == null ? 'italic' : 'normal'}
            color="wash"
            lang="en"
          >
            {report.message ?? 'No message'}
          </Typography>
        </div>

        <div
          className={classNames('inline-flex', 'flex-col', 'space-y-3', 'w-40')}
        >
          {report.impact && (
            <Badge variant={impactVariant} className="flex-shrink-0">
              {t('report.impact', 'Impact: {{impact}}', {
                impact: t(`impact.${report.impact.toLowerCase()}`),
              })}
            </Badge>
          )}

          {report.difficulty && (
            <Badge variant={difficultyVariant} className="flex-shrink-0">
              {t('report.difficulty', 'Difficulty: {{difficulty}}', {
                difficulty: t(`difficulty.${report.difficulty.toLowerCase()}`),
              })}
            </Badge>
          )}
        </div>

        {report.screenshot && (
          <div className="flex-shrink-0 ml-5">
            <Image
              src={report.screenshot}
              alt={
                report.target ?? t('report.no-desc', 'no description provided')
              }
              className="bg-black"
              variant="shadow"
              width="100px"
              height="100px"
            />
          </div>
        )}
      </div>

      {open && (
        <div
          id={detailsId}
          className={classNames('space-y-2', { hidden: !open })}
        >
          <Status report={report} title={url} />
          {withEditor && report.diffHunk ? (
            <DiffCodeFrame
              hunk={report.diffHunk}
              filename={url}
              title={t('report.suggestion', 'Suggested change')}
            />
          ) : (
            <CodeFrame
              title={t('report.code-frame', 'Code frame')}
              value={original}
              filename={url}
              highlightColor={report.outcome === Outcome.Fail ? 'red' : 'green'}
              highlightStart={report.location?.startLine}
              highlightEnd={report.location?.endLine}
            />
          )}
          {report.rule.mapping?.[0] && (
            <Reference name={report.rule.mapping?.[0]} />
          )}
        </div>
      )}
    </div>
  );
};
