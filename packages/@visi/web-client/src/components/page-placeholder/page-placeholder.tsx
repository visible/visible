import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React from 'react';
import { Trans } from 'react-i18next';

import { Button, Image, Typography } from '../../components/ui';
import { useTranslation } from '../../utils/i18next';

export const PagePlaceholder = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <Typography variant="h2">
        {t('page-placeholder.title', 'You are too early...')}
      </Typography>

      <Typography variant="p" color="wash" className="mb-4">
        <Trans i18nKey="page-placeholder.description">
          This feature is implementing in progress. Motivate us by starring the
          repository on{' '}
          <a
            href="https://github.com/visible/visible"
            target="_blank"
            rel="noreferrer"
            className="text-primary-500 hover:underline"
          >
            GitHub
          </a>
          !
        </Trans>
      </Typography>

      <div>
        <Button
          variant="primary"
          icon={<FontAwesomeIcon icon={faAngleLeft} />}
          onClick={() => router.back()}
        >
          {t('page-placeholder.back', 'Go Back')}
        </Button>
      </div>

      <Image
        src="/static/people.png"
        width="300px"
        className="m-auto"
        alt="Person who is using a computer"
      />
    </div>
  );
};
