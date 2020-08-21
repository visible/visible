import { Content, Search, Typography } from '@visi/web-ui';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useCreateDiagnosisMutation } from '../generated/graphql';
import { useTranslation } from '../utils/i18next';
import { withApollo } from '../utils/with-apollo';

const Wizard = styled.section`
  width: 100%;
  background-image: url(/static/diagnose.svg);
  background-repeat: no-repeat;
  background-size: cover;
  color: white;

  form[role='search'] {
    width: 360px;
  }
`;

const Inner = styled.div`
  padding: 68px 40px;

  & > *:not(:last-child) {
    margin-bottom: 18px;
  }
`;

const Index: NextPage = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const router = useRouter();

  const [
    createDiagnosis,
    { data, loading, error },
  ] = useCreateDiagnosisMutation({
    variables: {
      url: value,
    },
  });

  useEffect(() => {
    if (data)
      router.push('/diagnoses/[id]', `/diagnoses/${data.createDiagnosis.id}`);
  }, [data, router]);

  useEffect(() => {
    router.prefetch('/diagnoses/[id]');
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    createDiagnosis();
  };

  const title = t('home.title', 'Diagnose your website');
  const description = t(
    'home.description',
    'Type URL of the website to inspect accessibility issues of it',
  );

  return (
    <Content style={{ padding: '0', overflow: 'hidden' }}>
      <NextSeo title={title} description={description} openGraph={{ title }} />

      <Wizard>
        <Inner>
          <Typography variant="h2" color="inverse">
            {title}
          </Typography>

          <Search
            placeholder={t('home.placeholder', 'Type URL of the website')}
            submitLabel={t('home.submit', 'Diagnose')}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            required
          />

          {error && (
            <Typography color="inverse" fontStyle="italic">
              {error.message}
            </Typography>
          )}

          <Typography color="inverse">{description}</Typography>
        </Inner>
      </Wizard>
    </Content>
  );
};

Index.getInitialProps = async () => ({
  namespacesRequired: ['web-client'],
});

export default withApollo(Index);
