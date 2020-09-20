import { useEffect } from 'react';

import {
  Status,
  SubscribeDiagnosisDocument,
  useFetchDiagnosisLargeQuery,
} from '../generated/graphql';

export const useDiagnosis = (id: string) => {
  const result = useFetchDiagnosisLargeQuery({
    variables: {
      id,
    },
  });

  useEffect(() => {
    if (result == null) return;

    const unsubscribe = result.subscribeToMore({
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
  }, [id, result]);

  return result;
};
