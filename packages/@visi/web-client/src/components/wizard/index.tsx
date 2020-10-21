import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';

import { useCreateDiagnosisMutation } from '../../generated/graphql';
import { useTranslation } from '../../utils/i18next';
import { Search, Typography } from '../ui';

export const Wizard = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const router = useRouter();

  const [
    createDiagnosis,
    { data, error, loading },
  ] = useCreateDiagnosisMutation({
    variables: {
      url: value,
    },
  });

  useEffect(() => {
    if (data) {
      router.push(
        '/diagnoses/[diagnosis_id]',
        `/diagnoses/${data.createDiagnosis.id}`,
      );
    }
  }, [data, router]);

  useEffect(() => {
    router.prefetch('/diagnoses/[diagnosis_id]');
  }, [router]);

  const handleSubmit = () => {
    ReactGA.event({
      category: 'diagnoses',
      action: 'create',
      label: value,
    });

    createDiagnosis();
  };

  return (
    <div className="space-y-4">
      <div>
        <Typography variant="h2" color="invert">
          {t('home.title', 'Is your website visible?')}
        </Typography>
      </div>

      <label htmlFor="wizard-input" className="sr-only">
        {t('home.wizard-label', 'URL of your website')}
      </label>

      <Search
        type="url"
        id="wizard-input"
        size="large"
        className="w-full md:w-1/2"
        placeholder={t('home.placeholder', 'Type URL of the website')}
        onChange={(v: string) => void setValue(v)}
        onSubmit={handleSubmit}
        disabled={loading}
        required
      >
        {t('home.submit', 'Diagnose')}
      </Search>

      <div>
        {error && (
          <div aria-live="assertive">
            <Typography fontStyle="italic" color="invert">
              {error.message}
            </Typography>
          </div>
        )}

        <Typography color="invert">
          {t(
            'home.description',
            'Visible is a tool-chain that helps developers to build websites in the perspective of accessibility',
          )}
        </Typography>
      </div>
    </div>
  );
};
