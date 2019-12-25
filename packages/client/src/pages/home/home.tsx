import React from 'react';
import * as UI from '@visi/ui';
import styled from 'styled-components';
import { useTranslation, Trans } from 'react-i18next';
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

  return (
    <UI.Content style={{ padding: '0', overflow: 'hidden' }}>
      <Wizard>
        <Inner>
          <Title>{t('home.title', 'Diagnose your website')}</Title>
          <UI.Search
            submitLabel={t('home.submit', 'Diagnose')}
            placeholder={t('home.placeholder', 'Type URL of the website')}
          />
          <Description>
            <Trans i18nKey="home.description">
              Type URL of the website to inspect accessibility issues of it
            </Trans>
          </Description>
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
