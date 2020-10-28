import React from 'react';

import { useTranslation } from '../../utils/i18next';
import { Typography } from '../ui';
import { Feature } from './feature';

export const Features = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between w-full flex-wrap">
      <Typography variant="h3" className="sr-only">
        {t('features.title', 'Features')}
      </Typography>

      <Feature
        imageUrl="/static/robot.png"
        imageDescription={t('features.automation.alt', 'Robot using keyboard')}
        title={t('features.automation.title', 'Suggestion')}
        description={t(
          'features.automation.description',
          `Unlike other tools, Visible also provides patches to fix the a11y issues so you don’t need to search for information of the error and helps you to focus more on coding`,
        )}
      />

      <Feature
        imageUrl="/static/contract.png"
        imageDescription={t('features.learn.alt', 'Paper and pen')}
        title={t('features.learn.title', 'Learn about A11y')}
        description={t(
          'features.learn.description',
          `Visible always inform you which exact codes are violating rules which means you can learn more about accessibility as you code`,
        )}
      />

      <Feature
        imageUrl="/static/cog.png"
        imageDescription={t('features.ci.alt', 'Rounding cogs')}
        title={t('features.ci.title', 'Command-line')}
        description={t(
          'features.ci.description',
          `Visible is also available on command-line, so you can use it on continuous integrations services and monitor the website is fine.`,
        )}
      />
    </div>
  );
};
