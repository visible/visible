import { validateSync, ValidatorOptions } from 'class-validator';

export const validateOrRejectSync = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any,
  options?: ValidatorOptions,
) => {
  const errors = validateSync(target, options);

  if (errors.length !== 0) {
    throw errors;
  }

  return;
};
