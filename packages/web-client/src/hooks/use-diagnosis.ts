import { useEffect } from 'react';

import {
  Status,
  SubscribeDiagnosisDocument,
  useFetchDiagnosisLargeQuery,
} from '../generated/graphql';

export const useDiagnosis = (id: string) => {
  const { subscribeToMore, ...rest } = useFetchDiagnosisLargeQuery({
    variables: {
      id,
    },
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: SubscribeDiagnosisDocument,
      variables: {
        id,
      },
      updateQuery: (_, { subscriptionData }) => {
        if (subscriptionData.data.diagnosis.status === Status.Done) {
          unsubscribe();
          return subscriptionData.data;
        }
        return subscriptionData.data;
      },
    });

    return unsubscribe;
  }, [id, subscribeToMore]);

  return rest;
};
