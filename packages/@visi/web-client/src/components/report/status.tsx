import { faFile, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

import { ReportLargeFragment } from '../../generated/graphql';
import { Trans } from '../../utils/i18next';
import { KeywordList } from '../keyword-list/keyword-list';
import { Typography } from '../ui';

export interface StatusProps {
  report: ReportLargeFragment;
  title: string;
}

export const Status = ({ report, title }: StatusProps) => {
  return (
    <div className={classNames('inline-flex', 'space-x-8', 'overflow-x-auto')}>
      <div className="inline-flex items-center flex-shrink-0 space-x-2">
        <Typography fontSize="sm" color="wash">
          <FontAwesomeIcon icon={faFile} />
        </Typography>
        <Typography fontSize="sm" color="wash">
          <Trans i18nKey="report.filename" values={{ filename: title }}>
            Found at
            <Typography variant="code" fontSize="xs">
              {title}
            </Typography>
          </Trans>
        </Typography>
      </div>

      <div className="inline-flex items-center flex-shrink-0 space-x-2">
        <Typography fontSize="sm" color="wash">
          <FontAwesomeIcon icon={faFlag} />
        </Typography>

        <Typography fontSize="sm" color="wash">
          <Trans
            i18nKey="report.rule-id"
            values={{ ruleId: report.rule.coreId }}
          >
            Reported by
            <Typography variant="code" fontSize="xs">
              {report.rule.coreId}
            </Typography>
          </Trans>
        </Typography>
      </div>

      {report.rule.keywords && <KeywordList keywords={report.rule.keywords} />}
    </div>
  );
};
