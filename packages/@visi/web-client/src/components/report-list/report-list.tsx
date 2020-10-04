import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import ReactGA from 'react-ga';

import { Outcome, SourceLargeFragment } from '../../generated/graphql';
import { useTranslation } from '../../utils/i18next';
import { Report } from '../report';
import { Divider, SelectMock, Typography } from '../ui';

export const ReportPlaceholder = () => {
  return (
    <div aria-hidden className="flex mb-3">
      <div className="flex-1 space-y-2">
        <div className="bg-gray-300 rounded animate-pulse h-5 w-1/3" />

        <div className="space-y-1">
          <div className="bg-gray-300 rounded animate-pulse h-4 w-full" />
          <div className="bg-gray-300 rounded animate-pulse h-4 w-1/2" />
        </div>
      </div>

      <div
        style={{ width: '100px', height: '100px' }}
        className="bg-gray-300 rounded-lg animate-pulse ml-5"
      />
    </div>
  );
};

export interface ReportListProps {
  diagnosisId: string;
  sources: SourceLargeFragment[];
  loading: boolean;
}

// TODO: Move to backend
const filename = (url: string) => {
  const names = url.split('/');
  return '/' + names[names.length - 1];
};

// prettier-ignore
const order = (outcome: Outcome) =>
  outcome === Outcome.Fail ? 0
  : outcome === Outcome.Passed ? 1
  : 2;

export const ReportList = ({
  sources,
  diagnosisId,
  loading,
}: ReportListProps) => {
  const { t } = useTranslation();

  const reports = useMemo(
    () =>
      sources
        .flatMap((source) => source.reports)
        .sort((a, b) => order(a.outcome) - order(b.outcome)),
    [sources],
  );

  const sourceMap = useMemo(
    () =>
      sources.reduce<Record<string, SourceLargeFragment>>((m, source) => {
        source.reports.forEach((report) => {
          m[report.id] = source;
        });
        return m;
      }, {}),
    [sources],
  );

  const reportCount = useMemo(
    () => reports.filter((report) => report.outcome === Outcome.Fail).length,
    [reports],
  );

  return (
    <>
      <header>
        <div className="flex justify-between items-center mb-2">
          <div className="flex-1">
            <Typography variant="h3" fontSize="2xl">
              {t('report-list.title', 'Reports')}
            </Typography>
          </div>

          <div className="flex space-x-2">
            <SelectMock
              icon={<FontAwesomeIcon icon={faFilter} />}
              onOpen={() =>
                ReactGA.event({
                  category: 'Filter',
                  action: 'Expand',
                })
              }
            >
              {t('report.list.filter', 'Filter')}
            </SelectMock>
            <SelectMock
              icon={<FontAwesomeIcon icon={faSort} />}
              onOpen={() =>
                ReactGA.event({
                  category: 'Sort',
                  action: 'Expand',
                })
              }
            >
              {t('report.list.sort', 'Sort')}
            </SelectMock>
          </div>
        </div>

        <Typography color="wash" fontSize="sm">
          {t(
            'report-list.description',
            '{{count}} issues were reported from this website. Click to show the details including impacts and patches',
            { count: reportCount },
          )}
        </Typography>
      </header>

      <Divider />

      <ul>
        {loading
          ? Array.from({ length: 8 }, (_, i) => (
              <ReportPlaceholder key={`item-${i}`} />
            ))
          : reports.map((report) => (
              <li
                key={report.id}
                className="border-t first:border-none py-3 first:pt-0 last:pb-0 border-gray-200"
              >
                <Report
                  diagnosisId={diagnosisId}
                  report={report}
                  original={sourceMap[report.id].content}
                  title={filename(sourceMap[report.id].url)}
                  withKeywords
                  withEditor
                />
              </li>
            ))}
      </ul>
    </>
  );
};

ReportList.defaultProps = {
  loading: false,
};
