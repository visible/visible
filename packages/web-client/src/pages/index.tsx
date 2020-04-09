import * as UI from '@visi/web-ui';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useCreateDiagnosisMutation } from '../generated/graphql';
import { useTranslation } from '../utils/i18next';
import { withApollo } from '../utils/with-apollo';

const Wizard = styled.section`
  width: 100%;
  background-image: url(/diagnose.svg);
  background-repeat: no-repeat;
  background-size: cover;
  color: white;

  input {
    width: 400px;
  }
`;

const Inner = styled.div`
  width: 400px;
  padding: 68px 40px;
`;

const Title = styled.h2`
  font-size: 28px;
`;

const Description = styled.p`
  color: #f1f1f1;
  font-size: 12px;
`;

const Index = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const router = useRouter();

  const [createDiagnosis, { data, loading }] = useCreateDiagnosisMutation({
    variables: {
      url: value,
    },
  });

  useEffect(() => {
    if (data) router.push(`/diagnoses/${data.createDiagnosis.id}`);
  }, [data, router]);

  const title = t('home.title', 'Diagnose your website');
  const description = t(
    'home.description',
    'Type URL of the website to inspect accessibility issues of it',
  );

  return (
    <UI.Content style={{ padding: '0', overflow: 'hidden' }}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <Wizard>
        <Inner>
          <Title>{title}</Title>
          <UI.Search
            submitLabel={t('home.submit', 'Diagnose')}
            placeholder={t('home.placeholder', 'Type URL of the website')}
            onChange={e => setValue(e.target.value)}
            onSubmit={_ => createDiagnosis()}
          />
          <Description>{description}</Description>
          {loading && <UI.Progress progress={50} />}
          blah blah blah
        </Inner>
      </Wizard>
    </UI.Content>
  );
};

export default withApollo(Index);
