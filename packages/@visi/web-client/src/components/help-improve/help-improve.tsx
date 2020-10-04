// import classNames from 'classnames';
import React from 'react';

import { useTranslation } from '../../utils/i18next';
import { Button, Image, Typography } from '../ui';

export interface HelpImproveProps {
  withImage?: boolean;
}

export const HelpImprove = ({ withImage }: HelpImproveProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center w-full">
      <div className="md:max-w-screen-md">
        <Typography variant="h2" fontSize="2xl" className="mb-1">
          {t('help-improve.title', 'How to improve this page')}
        </Typography>

        <Typography>
          {t(
            'help-improve.description',
            'Let us know about any of your ideas, suggestions, or comments by reporting issues or creating pull requests on GitHub. You can also send messages via Twitter or Email.',
          )}
        </Typography>

        <div className="flex space-x-2 mt-4">
          <Button
            variant="secondary"
            href="https://github.com/visible/visible/issues/new"
          >
            {t('help-improve.new-issue', 'Create an issue on GitHub')}
          </Button>

          <Button variant="secondary" href="https://twitter.com/visible_hq">
            {t('help-improve.twitter', 'Twitter')}
          </Button>

          <Button variant="secondary" href="mailto://n33t5hin@gmail.com">
            {t('help-improve.email', 'Email')}
          </Button>
        </div>
      </div>

      {withImage && (
        <div className="hidden flex-shrink-0 md:block">
          <Image
            alt="collaborate"
            src="/static/idea.png"
            className="m-auto"
            width="160px"
          />
        </div>
      )}
    </div>
  );
};
