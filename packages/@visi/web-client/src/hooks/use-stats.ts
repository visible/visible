import { useEffect, useRef } from 'react';

import {
  SubscribeToStatsDocument,
  useFetchStatsQuery,
} from '../generated/graphql';

export const useStats = () => {
  const result = useFetchStatsQuery();
  const subscribeToMore = useRef(result.subscribeToMore);

  useEffect(() => {
    const unsubscribe = subscribeToMore.current({
      document: SubscribeToStatsDocument,
      updateQuery: (_, { subscriptionData }) => {
        return subscriptionData.data;
      },
    });

    return unsubscribe;
  }, []);

  return result;
};
