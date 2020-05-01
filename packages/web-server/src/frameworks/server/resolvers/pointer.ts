import { PointerResolvers } from '../generated/graphql';

export const resolveType: PointerResolvers['__resolveType'] = (parent) => {
  if ('propertyName' in parent) {
    return 'CSSPointer';
  }

  return 'HTMLPointer';
};
