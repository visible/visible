import { useEffect, useRef } from 'react';

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

  const subscribeToMore = useRef(result.subscribeToMore);

  useEffect(() => {
    const unsubscribe = subscribeToMore.current({
      document: SubscribeDiagnosisDocument,
      variables: {
        id,
      },
      updateQuery: (_, { subscriptionData }) => {
        if (subscriptionData.data.diagnosis.status === Status.Done) {
          unsubscribe();
        }
        return subscriptionData.data;
      },
    });

    return unsubscribe;
  }, [id]);

  return result;
};
