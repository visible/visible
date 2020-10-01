import {
  faCheck,
  faQuestion,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

import { Outcome } from '../../generated/graphql';
import { useTranslation } from '../../utils/i18next';

export const OutcomeIcon = ({ outcome }: { outcome: Outcome }) => {
  const { t } = useTranslation();
  const baseClass = classNames(
    'text-xl',
    'absolute',
    'top-0',
    'left-0',
    '-ml-8',
  );

  switch (outcome) {
    case Outcome.Fail:
      return (
        <span
          title={t('report.outcome.fail', 'Fail')}
          className={classNames('text-red-600', baseClass)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </span>
      );
    case Outcome.Passed:
      return (
        <span
          title={t('report.outcome.passed', 'Passed')}
          className={classNames('text-green-600', baseClass)}
        >
          <FontAwesomeIcon icon={faCheck} />
        </span>
      );
    case Outcome.Inapplicable:
      return (
        <span
          title={t('report.outcome.inapplicable', 'Inapplicable')}
          className={classNames('text-gray-800', baseClass)}
        >
          <FontAwesomeIcon icon={faQuestion} />
        </span>
      );
  }
};
