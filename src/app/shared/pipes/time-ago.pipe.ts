const intervals = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 1 }
];

function timeSince(date: Date, compareDate: Date) {
  const seconds = Math.floor((date.getTime() - compareDate.getTime()) / 1000);
  let interval = intervals.find(i => i.seconds < seconds);
  if (!interval) {
    interval = intervals[intervals.length - 1];
  }
  const count = Math.floor(seconds / interval.seconds) || 1;
  return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeAgo'
})

export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date, compareTime?: string | Date): string {
    if (!value) return '-';
    const compareTimeResolved = typeof compareTime === 'string' ? new Date(compareTime) : (compareTime || new Date());
    const valueResolved = typeof value === 'string' ? new Date(value) : value;
    return timeSince(compareTimeResolved, valueResolved);
  }
}
