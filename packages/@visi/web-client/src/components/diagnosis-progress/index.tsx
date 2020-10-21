import React, { useMemo } from 'react';

import {
  DiagnosisLargeFragment,
  StatsLargeFragment,
  Status,
} from '../../generated/graphql';
import { useRelativeDate } from '../../hooks/use-relative-date';
import { useStats } from '../../hooks/use-stats';
import { useTranslation } from '../../utils/i18next';
import { Card, Progress, Typography } from '../ui';

export type DiagnosisProgressProps = {
  diagnosis: DiagnosisLargeFragment;
};

const AVG_TIME = 1000 * 60 * 1;

const QueueProgress = ({
  stats,
  diagnosis,
}: {
  stats: StatsLargeFragment;
  diagnosis: DiagnosisLargeFragment;
}) => {
  const { t } = useTranslation();

  // This should be handled in domain level but we handle it on client
  // due to the performance issue.
  const waitingCountAhead = Math.max(
    diagnosis.waitingCountAtCreation -
      (stats.diagnosisCompleteCount - diagnosis.completeCountAtCreation),
    0,
  );

  const eta = useMemo(
    () => new Date(Date.now() + waitingCountAhead * AVG_TIME),
    [waitingCountAhead],
  );

  const { relativeDate } = useRelativeDate(eta);

  return (
    <Card variant="solid" className="w-2/3 mx-auto my-8">
      <Card.Heading>
        <Typography variant="h3" fontSize="lg">
          {waitingCountAhead > 0
            ? t(
                'diagnoses.queued.title',
                'Waiting for other {{count}} diagnoses to complete',
                { count: waitingCountAhead },
              )
            : t('diagnoses.queued.ready', 'Diagnosis will start soon...')}
        </Typography>
      </Card.Heading>

      <Card.Body>
        <Typography color="wash">
          {t(
            'diagnoses.queue.description',
            'This website has been added to the queue and waiting for other diagnoses to complete.',
          )}
        </Typography>

        <Progress
          id="diagnosis-progress"
          max={diagnosis.waitingCountAtCreation}
          value={Math.max(
            diagnosis.waitingCountAtCreation - waitingCountAhead,
            0,
          )}
          label={t('diagnoses.processing.label', 'Progress')}
          aria-live="polite"
          message={relativeDate}
        />
      </Card.Body>
    </Card>
  );
};

const QueueProgressContainer = ({ diagnosis }: DiagnosisProgressProps) => {
  const { data } = useStats();
  if (data == null) return null;
  const { stats } = data;
  return <QueueProgress stats={stats} diagnosis={diagnosis} />;
};

export const DiagnosisProgress = ({ diagnosis }: DiagnosisProgressProps) => {
  const { t } = useTranslation();

  if (diagnosis.status === Status.Queued) {
    return <QueueProgressContainer diagnosis={diagnosis} />;
  }

  if (
    diagnosis.status === Status.Started ||
    diagnosis.status === Status.Processing
  ) {
    return (
      <Card variant="solid" className="w-2/3 mx-auto my-8">
        <Card.Heading>
          <Typography variant="h3" fontSize="lg">
            {t('diagnoses.processing.title', 'Processing diagnostics')}
          </Typography>
        </Card.Heading>

        <Card.Body>
          <Typography color="wash">
            {t(
              'diagnoses.processing.description',
              'Running diagnostics program on the server. This process takes a while to complete...',
            )}
          </Typography>

          <Progress
            id="diagnosis-progress"
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
