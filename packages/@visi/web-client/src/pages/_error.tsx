import { NextPage } from 'next';
import React from 'react';

import { Layout, Typography } from '../components/ui';
import { useTranslation } from '../utils/i18next';

interface ErrorProps {
  children?: React.ReactNode;
  name?: string;
  message?: string;
  statusCode?: number;
  stack?: string;
}

const Error: NextPage<ErrorProps> = (props) => {
  const { name, message, stack, statusCode } = props;
  const { t } = useTranslation();

  return (
    <Layout.Page>
      <Layout.Container>
        <Layout.Main>
          <Typography variant="h1">
            {statusCode && `${statusCode}: `}
            {name ??
              t('error.default-title', 'An unexpected error has occurred')}
          </Typography>

          <Typography variant="p">
            {message ?? t('error.default-message', 'No error message given')}
          </Typography>

          {stack && <samp>{stack}</samp>}
        </Layout.Main>
      </Layout.Container>
    </Layout.Page>
  );
};

Error.getInitialProps = ({ err }) => ({
  namespacesRequired: ['web-client'],
  name: err?.name,
  message: err?.message,
  statusCode: err?.statusCode,
  stack: err?.stack,
});

export default Error;
