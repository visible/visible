import { Code, Content, Typography } from '@visi/web-ui';
import { NextPage } from 'next';
import React from 'react';

import { useTranslation } from '../utils/i18next';

interface ErrorProps {
  children?: React.ReactNode;
  name?: string;
  message?: string;
  statusCode?: number;
  stack?: string;
}

const Error: NextPage<ErrorProps> = props => {
  const { name, message, stack, statusCode } = props;
  const { t } = useTranslation();

  return (
    <Content>
      <Typography variant="h1">
        {statusCode && `${statusCode}: `}
        {name ?? t('error.default-title', 'An unexpected error has occurred')}
      </Typography>

      <Typography variant="body">
        {message ?? t('error.default-message', 'No error message given')}
      </Typography>

      {stack && <Code language="">{stack}</Code>}
    </Content>
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
