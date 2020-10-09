import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

import { useCreateDiagnosisMutation } from '../../generated/graphql';
import { useTranslation } from '../../utils/i18next';
import { Button, Typography } from '../ui';

export interface RerunProps {
  url: string;
  disabled?: boolean;
  className?: string;
}

export const Rerun = ({ url, className, disabled }: RerunProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [
    createDiagnosis,
    { data, loading, error },
  ] = useCreateDiagnosisMutation({
    variables: { url },
  });

  useEffect(() => {
    if (data != null) {
      router.push(
        '/diagnoses/[diagnosis_id]',
        `/diagnoses/${data.createDiagnosis.id}`,
      );
    }
  }, [data, router]);

  const handleClick = () => {
    ReactGA.event({
      category: 'diagnoses',
      action: 'rerun',
      label: url,
    });

    createDiagnosis();
  };

  return (
    <>
      <Button
        variant="primary"
        disabled={loading || disabled}
        size="large"
        className={className}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faSyncAlt} className="mr-2" spin={loading} />
        {t('rerun.title', 'Rerun')}
      </Button>

      {error?.message && <Typography>{error?.message}</Typography>}
    </>
  );
};
