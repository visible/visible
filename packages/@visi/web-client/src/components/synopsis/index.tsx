import React from 'react';

import { useTranslation } from '../../utils/i18next';
import { Image, Typography } from '../ui';

export const Synopsis = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex-1 max-w-screen-md">
        <Typography variant="h3" fontSize="2xl">
          {t('synopsis.title', 'Less pain, more accessible')}
        </Typography>

        <Typography variant="p">
          {t(
            'synopsis.description',
            `Visible is not just a linter, we also provide information on how to make your website accessible. We indicate which part you need to fix, give you patches of codes, give you references to the standards — to help you to learn and improve the accessibility of your website.`,
          )}
        </Typography>
      </div>

      <div className="flex-shrink-0">
        <Image
          src="/static/books.png"
          alt={t('synopsis.image', 'Book')}
          width="200px"
        />
      </div>
    </div>
  );
};
