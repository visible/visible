import useInterval from '@use-it/interval';
import dayjs from 'dayjs';
import { useState } from 'react';

export const useRelativeDate = (date: Date, interval = 1000) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useInterval(() => {
    setCurrentDate(new Date());
  }, interval);

  const relativeDate = dayjs(date).from(currentDate);

  return { relativeDate };
};
