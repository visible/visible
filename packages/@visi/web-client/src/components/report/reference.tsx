import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ReactGA from 'react-ga';

import { useTranslation } from '../../utils/i18next';
import { Typography } from '../ui';

export interface ReferenceProps {
  name: string;
}

export const Reference = ({ name }: ReferenceProps) => {
  const id = name.split(':')[1];
  const { t } = useTranslation();
  const href = `https://www.w3.org/TR/WCAG21/#${id}`;

  const handleClick = () => {
    ReactGA.event({
      category: 'report',
      action: 'open-reference',
      label: href,
    });
  };

  return (
    <span className="space-x-2 inline-flex">
      <Typography fontSize="sm" color="wash">
        <FontAwesomeIcon icon={faLink} />
      </Typography>

      <Typography fontSize="sm" color="wash">
        {t('report.reference', 'Reference: ')}

        <a
          className="text-primary-500 hover:underline"
          href={href}
          target="_blank"
          hrefLang="en"
          rel="noreferrer"
          onClick={handleClick}
        >
          {href}
        </a>
      </Typography>
    </span>
  );
};
