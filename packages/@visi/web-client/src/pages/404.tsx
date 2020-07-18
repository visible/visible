import { Content, Typography } from '@visi/web-ui';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link, { LinkProps } from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { Trans, useTranslation } from '../utils/i18next';

const L = (props: LinkProps & { children: React.ReactNode }) => {
  const { children, ...rest } = props;

  return (
    <Link {...rest}>
      <a>{children}</a>
    </Link>
  );
};

const Inner = styled.div`
  text-align: center;
`;

const Image = styled.img`
  width: 50%;
`;

const NotFound: NextPage = () => {
  const { t } = useTranslation();
  const title = t('not-found.title', 'You hit the void!');

  return (
    <Content appearance="skeleton">
      <NextSeo title={title} description={'foobar'} />

      <Inner>
        <Image src="/static/404.png" alt={title} />
        <Typography variant="h1">{title}</Typography>

        <Typography variant="body">
          <Trans i18nKey="not-found.content">
            The page you were looking for was not found. You can{' '}
            <L href="/">go back to home</L> or{' '}
            <L href="/search">search contents</L>
          </Trans>
        </Typography>
      </Inner>
    </Content>
  );
};

export default NotFound;
