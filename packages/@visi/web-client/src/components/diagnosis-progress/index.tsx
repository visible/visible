import React from 'react';

import { DiagnosisLargeFragment, Status } from '../../generated/graphql';
import { useTranslation } from '../../utils/i18next';
import { Card, Progress, Typography } from '../ui';

export type DiagnosisProgressProps = {
  diagnosis: DiagnosisLargeFragment;
};

export const DiagnosisProgress = ({ diagnosis }: DiagnosisProgressProps) => {
  const { t } = useTranslation();

  if (
    diagnosis.status === Status.Queued ||
    diagnosis.status === Status.Started ||
    diagnosis.status === Status.Processing
  ) {
    return (
      <Card variant="solid" className="w-2/3 mx-auto my-8">
        <Card.Heading>
          <Typography variant="h3" fontSize="lg">
            {diagnosis.status === Status.Queued
              ? t(
                  'diagnoses.queued.title',
                  'Waiting for other diagnoses to completed',
                )
              : diagnosis.status === Status.Started
              ? t('diagnoses.started.title', 'Diagnosis will start soon...')
              : t('diagnoses.processing.title', 'Processing diagnostics')}
          </Typography>
        </Card.Heading>

        <Card.Body>
          <Typography color="wash">
            {diagnosis.status === Status.Queued
              ? t(
                  'diagnoses.queued.description',
                  'This website has been added to the queue and waiting for other process to complete',
                )
              : t(
                  'diagnoses.processing.description',
                  'Running diagnostics program on the server. This process takes a while to complete...',
                )}
          </Typography>

          <Progress
            id="diagnoses-progress"
            max={diagnosis.totalCount}
            value={diagnosis.doneCount}
            label={t('diagnoses.processing.label', 'Progress')}
            aria-live="polite"
          />
        </Card.Body>
      </Card>
    );
  }

  return null;
};
