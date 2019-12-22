import { Spinner } from 'cli-spinner';

export const loader = async <T>(message: string, promise: Promise<T>) => {
  const spinner = new Spinner(message).setSpinnerString(18).start();
  const result = await promise;

  const stream = spinner.stop().stream;
  spinner.clearLine(stream);

  return result;
};
