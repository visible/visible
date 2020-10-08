import React from 'react';

import { useTranslation } from '../../utils/i18next';
import { Image, Typography } from '../ui';
import { NewsletterForm } from './form';

export interface NewsletterProps {
  withImage?: boolean;
}

export const Newsletter = ({ withImage }: NewsletterProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center w-full">
      <section className="flex-1">
        <Typography variant="h2" fontSize="2xl" className="mb-1">
          {t('newsletter.title', 'Sign up for beta, now!')}
        </Typography>

        <Typography>
          {t(
            'newsletter.description',
            'We will keep you informed of the latest news about the product! In case if you interested in Visible and accessibility, please fill the form below to sign up for the newsletter including announcements of beta testing.',
          )}
        </Typography>

        <NewsletterForm className="mt-8 m-auto max-w-screen-md" />
      </section>

      {withImage && (
        <div className="hidden flex-shrink-0 md:block">
          <Image
            alt="newsletter"
            className="m-auto"
            src="/static/beta.png"
            width="200px"
          />
        </div>
      )}
    </div>
  );
};
