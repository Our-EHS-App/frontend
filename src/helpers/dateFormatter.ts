import dayjs, { Dayjs } from 'dayjs';

export const dateFormatter = (
  date: Dayjs,
  language: string,
  format = 'YYYY/MM/DD hh:mmA'
) => {
  if (language == 'ar') {
    return dayjs(date)?.locale('ar-sa')?.format(format);
  }
  return dayjs(date)?.locale('en')?.format(format);
};
