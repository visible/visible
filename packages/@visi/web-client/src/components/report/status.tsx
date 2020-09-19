import { faFile, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

import { ReportLargeFragment } from '../../generated/graphql';
import { useTranslation } from '../../utils/i18next';
import { KeywordList } from '../keyword-list/keyword-list';
import { Typography } from '../ui';

export interface StatusProps {
  report: ReportLargeFragment;
  title: string;
}

export const Status = ({ report, title }: StatusProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames('inline-flex', 'space-x-8', 'overflow-x-auto')}>
      <div className="inline-flex items-center flex-shrink-0">
        <Typography variant="p" fontSize="sm" color="wash">
          <FontAwesomeIcon icon={faFile} />
          {t('report.filename', 'Found at')}
        </Typography>
        <Typography variant="code" fontSize="xs">
          {title}
        </Typography>
      </div>

      <div className="inline-flex items-center flex-shrink-0">
        <Typography variant="p" fontSize="sm" color="wash">
          <FontAwesomeIcon icon={faFlag} />
          {t('report.rule-id', 'Reported by')}
        </Typography>

        <Typography variant="code" fontSize="xs">
          {report.rule.coreId}
        </Typography>
      </div>

      {report.rule.keywords && <KeywordList keywords={report.rule.keywords} />}
    </div>
  );
};
