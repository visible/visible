import React, { useState } from 'react';
import * as UI from '@visi/ui';
import styled from 'styled-components';
import { useTranslation, Trans } from 'react-i18next';
import { useDiagnoseUrlMutation } from '../../generated/graphql';
import Diagnostics from '../diagnostics';
import diagnose from './diagnose.svg';

const Wizard = styled.section`
  width: 100%;
  background-image: url(${diagnose});
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

export const Home = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const [diagnoseURL, { data, loading }] = useDiagnoseUrlMutation({
    variables: {
      url: value,
    },
  });

  // useEffect(() => {
  //   if (data) history.push(`/diagnostics/${data.diagnoseURL.id}`);
  // }, [data, history]);

  if (data) {
    return <Diagnostics diagnostic={data.diagnoseURL} />;
  }

  return (
    <UI.Content style={{ padding: '0', overflow: 'hidden' }}>
      <Wizard>
        <Inner>
          <Title>{t('home.title', 'Diagnose your website')}</Title>
          <UI.Search
            submitLabel={t('home.submit', 'Diagnose')}
            placeholder={t('home.placeholder', 'Type URL of the website')}
            onChange={e => setValue(e.target.value)}
            onSubmit={_ => diagnoseURL()}
          />
          <Description>
            <Trans i18nKey="home.description">
              Type URL of the website to inspect accessibility issues of it
            </Trans>
          </Description>
          {loading && <UI.Progress progress={50} />}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Inner>
      </Wizard>
    </UI.Content>
  );
};
