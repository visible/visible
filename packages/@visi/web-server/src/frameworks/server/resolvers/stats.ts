import { QueryResolvers, SubscriptionResolvers } from '../generated/graphql';

export const rootStats: QueryResolvers['stats'] = (
  _,
  __,
  { statsController },
) => {
  return statsController.find();
};

export const statsSubscription: SubscriptionResolvers['stats'] = {
  subscribe(_, __, { statsController }) {
    return statsController.subscribe();
  },
};
