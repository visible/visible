import {
  faFile,
  faFlag,
  faUniversalAccess,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import { HelpImprove } from '../../../components/help-improve/help-improve';
import { KeywordList } from '../../../components/keyword-list/keyword-list';
import { Newsletter } from '../../../components/newsletter';
import { Project } from '../../../components/project';
import { ReportList } from '../../../components/report-list';
import { SourceList } from '../../../components/source-list';
import {
  Card,
  Divider,
  Layout,
  Nav,
  Progress,
  Typography,
  Widget,
} from '../../../components/ui';
import { DiagnosisLargeFragment, Status } from '../../../generated/graphql';
import { useDiagnosis } from '../../../hooks/use-diagnosis';
import { useTranslation } from '../../../utils/i18next';
import { withApollo } from '../../../utils/with-apollo';

const LoadingIndicator = ({
  diagnosis,
}: {
  diagnosis: DiagnosisLargeFragment;
}) => {
  const { t } = useTranslation();

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
        <Progress max={diagnosis.totalCount} value={diagnosis.doneCount} />
      </Card.Body>
    </Card>
  );
};

const Diagnoses: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  if (typeof router.query.diagnosis_id !== 'string') {
    throw new TypeError('Id must be a string');
  }

  const { data, loading, error } = useDiagnosis(router.query.diagnosis_id);

  // prettier-ignore
  const keywords = useMemo(() => [
    ...new Set(
      data?.diagnosis.sources
        .flatMap((source) => source.reports)
        .flatMap((report) => report.rule.keywords),
    ).values(),
  ].filter((v): v is string => v != null), [data?.diagnosis]);

  if (loading) {
    return <p>{t('diagnoses.loading', 'Loading...')}</p>;
  }

  if (error != null || data == null) {
    return <p>{t('diagnoses.error', 'Error occurred')}</p>;
  }

  const { diagnosis } = data;
  const domain = new URL(diagnosis.url).hostname;

  const title = t('diagnoses.title', 'Reports: {{domain}}', {
    domain,
  });

  const description = t(
    'diagnoses.description',
    'Accessibility issues and suggestions for {{domain}} provided by Visible',
    { domain },
  );

  return (
    <Layout.Main className="space-y-4 mb-12">
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          images: diagnosis.screenshot
            ? [{ url: diagnosis.screenshot, alt: diagnosis.url }]
            : undefined,
          title,
          description,
        }}
      />

      <div className={classNames('border-b', 'border-gray-200', 'bg-gray-100')}>
        <Layout.Container>
          <Project diagnosis={diagnosis} />

          <Nav
            items={[
              {
                href: '/diagnoses/[diagnosis_id]',
                as: `/diagnoses/${diagnosis.id}`,
                icon: <FontAwesomeIcon icon={faFlag} />,
                children: t('diagnoses.reports', 'Reports'),
              },
              {
                href: '/diagnoses/[diagnosis_id]/files',
                as: `/diagnoses/${diagnosis.id}/files`,
                icon: <FontAwesomeIcon icon={faFile} />,
                children: t('diagnoses.files', 'Files'),
              },
              {
                href: '/diagnoses/[diagnosis_id]/rules',
                as: `/diagnoses/${diagnosis.id}/rules`,
                icon: <FontAwesomeIcon icon={faUniversalAccess} />,
                children: t('diagnoses.rules', 'Rules'),
              },
            ]}
          />
        </Layout.Container>
      </div>

      <Layout.Container>
        <Layout.Content
          aria-busy={diagnosis.status !== Status.Done}
          aria-live="polite"
        >
          {diagnosis.status !== Status.Done && (
            <LoadingIndicator diagnosis={diagnosis} />
          )}

          <ReportList
            sources={diagnosis.sources}
            diagnosisId={diagnosis.id}
            loading={diagnosis.sources.length === 0}
          />
        </Layout.Content>

        <Layout.Aside>
          <Widget id="sources">
            <Widget.Title>
              <Typography variant="h3" fontSize="xl">
                {t('diagnoses.sources', 'Files')}
              </Typography>
            </Widget.Title>

            <Widget.Body>
              <SourceList
                diagnosisId={diagnosis.id}
                sources={diagnosis.sources}
                loading={diagnosis.sources.length === 0}
                withFailCount
              />
            </Widget.Body>
          </Widget>

          <Widget id="keywords">
            <Widget.Title>
              <Typography variant="h3" fontSize="xl">
                {t('diagnoses.keywords', 'Keywords')}
              </Typography>
            </Widget.Title>

            <Widget.Body>
              <KeywordList
                wrap
                keywords={keywords}
                loading={keywords.length === 0}
              />
            </Widget.Body>
          </Widget>
        </Layout.Aside>
      </Layout.Container>

      <Layout.Container className="space-y-10 my-4">
        <Divider className="mt-0 mb-0" />
        <HelpImprove withImage />
        <Newsletter withImage />
      </Layout.Container>
    </Layout.Main>
  );
};

Diagnoses.getInitialProps = async () => ({
  namespacesRequired: ['web-client'],
});

export default withApollo({ ssr: true })(Diagnoses);
