import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import ReactGA from 'react-ga';

export const useGoogleAnalytics = () => {
  const router = useRouter();
  const initialRoute = useRef(router.pathname);

  // Initialize Google Analytics
  useEffect(() => {
    const { publicRuntimeConfig } = getConfig();

    ReactGA.initialize(publicRuntimeConfig.gaTrackingId, {
      debug: process.env.NODE_ENV === 'development',
    });

    ReactGA.pageview(initialRoute.current);
  }, []);

  // Track page changing with Google Analytics
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ReactGA.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};
