export type ShortenedDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export const DAYS: { value: string; shortened: ShortenedDay }[] = [
  {
    value: 'Monday',
    shortened: 'mon',
  },
  {
    value: 'Tuesday',
    shortened: 'tue',
  },
  {
    value: 'Wednesday',
    shortened: 'wed',
  },
  {
    value: 'Thursday',
    shortened: 'thu',
  },
  {
    value: 'Friday',
    shortened: 'fri',
  },
  {
    value: 'Saturday',
    shortened: 'sat',
  },
  {
    value: 'Sunday',
    shortened: 'sun',
  },
];
