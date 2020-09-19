import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ReactGA from 'react-ga';

import { Outcome, SourceLargeFragment } from '../../generated/graphql';
import { useTranslation } from '../../utils/i18next';
import { Report } from '../report';
import { Select, Typography } from '../ui';

export interface ReportListProps {
  diagnosisId: string;
  sources: SourceLargeFragment[];
}

// TODO: Move to backend
const filename = (url: string) => {
  const names = url.split('/');
  return '/' + names[names.length - 1];
};

export const ReportList = (props: ReportListProps) => {
  const { sources, diagnosisId } = props;
  const { t } = useTranslation();

  return (
    <>
      <header className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex-1">
            <Typography variant="h3" fontSize="xl">
              {t('report-list.title', 'Reports')}
            </Typography>
          </div>

          <div className="flex space-x-2">
            <Select
              icon={<FontAwesomeIcon icon={faFilter} />}
              onOpen={() =>
                ReactGA.event({
                  category: 'Filter',
                  action: 'Expand',
                })
              }
            >
              Filter
            </Select>
            <Select
              icon={<FontAwesomeIcon icon={faSort} />}
              onOpen={() =>
                ReactGA.event({
                  category: 'Sort',
                  action: 'Expand',
                })
              }
            >
              Sort
            </Select>
          </div>
        </div>

        <Typography color="wash" fontSize="sm">
          {t(
            'report-list.description',
            '{{count}} issues were reported from this website. Click to show the details including impacts and patches',
            {
              count: sources
                .flatMap((source) => source.reports)
                .filter((report) => report.outcome === Outcome.Fail).length,
            },
          )}
        </Typography>
      </header>

      <ul>
        {sources.map((source) =>
          source.reports.map((report) => (
            <li
              key={report.id}
              className="border-t border-gray-200 first:border-t-0 py-4"
            >
              <Report
                diagnosisId={diagnosisId}
                report={report}
                original={source.content}
                title={filename(source.url)}
                withKeywords
                withEditor
              />
            </li>
          )),
        )}
      </ul>
    </>
  );
};
