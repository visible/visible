import React from 'react';

import { useTranslation } from '../../utils/i18next';
import { Button, Card, Input, Select, Typography } from '../ui';

export interface NewsletterProps {
  className?: string;
}

export const NewsletterForm = ({ className }: NewsletterProps) => {
  const { t } = useTranslation();

  return (
    <form
      action="https://dev.us2.list-manage.com/subscribe/post?u=0fd620488ca5608279935bfd4&amp;id=336d7c82bd"
      method="post"
      target="_blank"
      className={className}
      name="mc-embedded-subscribe-form"
    >
      <Card variant="solid">
        <Card.Heading>
          <Typography variant="h3" fontSize="xl">
            {t('newsletter-form.title', 'Newsletter')}
          </Typography>
        </Card.Heading>

        <Typography color="wash">
          {t(
            'newsletter-form.description',
            'We will send an email about once a month. You can unsubscribe from the newsletter anytime you want.',
          )}
        </Typography>

        <fieldset className="space-y-2 mt-4">
          <div className="flex justify-between items-center">
            <label htmlFor="newsletter-form-email">
              {t('newsletter-form.email', 'Email address')}
              <span className="text-red-500">*</span>
            </label>
            <Input
              id="newsletter-form-email"
              type="email"
              name="EMAIL"
              placeholder="you@example.com"
              size="small"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="newsletter-form-role">
              {t('newsletter-form.role', "I'm a...")}
              <span className="text-red-500">*</span>
            </label>

            <Select name="MERGE1" id="newsletter-form-role" required>
              <Select.Option value="Developer">
                {t('newsletter-form.developer', 'Developer')}
              </Select.Option>

              <Select.Option value="Designer">
                {t('newsletter-form.designer', 'Designer')}
              </Select.Option>

              <Select.Option value="Accessibility Professional">
                {t('newsletter-form.a11y-pro', 'Accessibility Professional')}
              </Select.Option>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button variant="primary" type="submit" name="subscribe">
              {t('newsletter-form.subscribe', 'Subscribe')}
            </Button>
          </div>
        </fieldset>
      </Card>
    </form>
  );
};
