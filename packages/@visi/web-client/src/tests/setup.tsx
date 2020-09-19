import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../utils/i18next');
jest.mock('../utils/with-apollo');

jest.mock('*.css', () => '');

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      prefetch() {
        return null;
      },
    };
  },
}));

jest.mock('../hooks/use-google-analytics', () => ({
  useGoogleAnalytics() {
    return;
  },
}));
