import React from 'react';
import 'jest-styled-components';

// react-i18next
// See: https://react.i18next.com/misc/testing
jest.mock('react-i18next', () => {
  const t = (_key: string, defaultValue: string) => {
    return defaultValue;
  };

  const Trans: React.FC = ({ children }) => <>{children}</>;

  return {
    __esModule: true,
    useTranslation: () => ({ t }),
    Trans,
  };
});
