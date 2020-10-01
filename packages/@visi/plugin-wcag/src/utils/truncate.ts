export const truncate = (text: string, threshold = 20): string => {
  const flag = text.length > threshold;
  let short = text.substr(0, threshold);
  if (flag) short += '...';
  return short;
};
