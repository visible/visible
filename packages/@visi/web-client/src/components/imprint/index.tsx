import React from 'react';

import { Trans, useTranslation } from '../../utils/i18next';
import { Typography } from '../ui';

export const Imprint = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography variant="h3" fontSize="2xl" className="mb-1">
        {t('imprint.title', 'Who created Visible?')}
      </Typography>

      <Typography variant="p">
        <Trans i18nKey="imprint.description">
          Visible is developed by a high schooler{' '}
          <a
            href="https://twitter.com/thegodofneet"
            target="_blank"
            rel="noreferrer"
            className="text-primary-500 hover:underline"
          >
            Ryō Igarashi
          </a>{' '}
          in open source for groping and enhancing the possibility of Web and
          assistive technology since December 2019. As of May 2020, Visible was
          accepted by{' '}
          <a
            href="https://www.mitou.org/"
            target="_blank"
            rel="noreferrer"
            className="text-primary-500 hover:underline"
          >
            Mitou Foundation
          </a>{' '}
          as a project of{' '}
          <a
            href="https://jr.mitou.org/"
            target="_blank"
            rel="noreferrer"
            className="text-primary-500 hover:underline"
          >
            Mitou Junior
          </a>{' '}
          and is receiving technical/financial supports.
        </Trans>
      </Typography>
    </div>
  );
};
