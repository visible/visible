import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link, { LinkProps } from 'next/link';
import React from 'react';

import { Image, Layout, Typography } from '../components/ui';
import { Trans, useTranslation } from '../utils/i18next';

const L = (props: LinkProps & { children: React.ReactNode }) => {
  const { children, ...rest } = props;

  return (
    <Link {...rest}>
      <a className="text-primary-500 hover:underline">{children}</a>
    </Link>
  );
};

const NotFound: NextPage = () => {
  const { t } = useTranslation();
  const title = t('not-found.title', 'You hit the void!');

  return (
    <Layout.Main>
      <NextSeo title={title} description={'foobar'} />

      <Layout.Container>
        <Layout.Content>
          <Typography variant="h1">{title}</Typography>

          <Typography variant="p" className="mb-4">
            <Trans i18nKey="not-found.content">
              The page you were looking for was not found. You can{' '}
              <L href="/">go back to home</L> or{' '}
              <L href="/search">search contents</L>
            </Trans>
          </Typography>

          <Image src="/static/404.png" alt={title} className="w-1/6 m-auto" />
        </Layout.Content>
      </Layout.Container>
    </Layout.Main>
  );
};

export default NotFound;
