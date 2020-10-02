import classNames from 'classnames';
import React, { useState } from 'react';
import ReactGA from 'react-ga';

import {
  Difficulty,
  Impact,
  ReportLargeFragment,
} from '../../generated/graphql';
import { useTranslation } from '../../utils/i18next';
import { Badge, BadgeVariant, Image, Typography } from '../ui';
import { Editor } from './editor';
import { OutcomeIcon } from './outcome';
import { Reference } from './reference';
import { Status } from './status';

export interface ReportProps {
  original: string;
  title: string;
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

export const Report = ({
  report,
  original,
  title,
  withEditor,
}: ReportProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const impactVariant = mapImpact(report.impact);
  const difficultyVariant = mapDifficulty(report.difficulty);

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
    <details className={wrapper} open={open}>
      <summary onClick={handleClick}>
        {/* Wrap by div due to Safari's bug */}
        <div className={content}>
          <div className="flex-1 relative">
            <OutcomeIcon outcome={report.outcome} />

            <Typography
              className="group-hover:text-primary-500"
              variant="h4"
              fontSize="lg"
            >
              {report.rule.name}
            </Typography>

            <Typography
              variant="p"
              fontStyle={report.message == null ? 'italic' : 'normal'}
              color="wash"
            >
              {report.message ?? 'No message'}
            </Typography>
          </div>

          <div
            className={classNames(
              'inline-flex',
              'flex-col',
              'space-y-3',
              'w-40',
            )}
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
                  difficulty: t(
                    `difficulty.${report.difficulty.toLowerCase()}`,
                  ),
                })}
              </Badge>
            )}
          </div>

          {report.screenshot && (
            <div className="flex-shrink-0 ml-5">
              <Image
                src={report.screenshot}
                alt={
                  report.target ??
                  t('report.no-desc', 'no description provided')
                }
                className="bg-black"
                variant="shadow"
                width="100px"
                height="100px"
              />
            </div>
          )}
        </div>
      </summary>

      <Status report={report} title={title} />

      {withEditor && (
        <Editor
          value={original}
          patch={report.diffHunk ?? undefined}
          message={report.message ?? undefined}
          location={report.location ?? undefined}
        />
      )}

      {report.rule.mapping?.[0] && (
        <Reference name={report.rule.mapping?.[0]} />
      )}
    </details>
  );
};
