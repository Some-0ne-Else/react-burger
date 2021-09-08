/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/prefer-default-export
import {
  isToday, isYesterday, isValid, differenceInCalendarDays, parseISO, format,
} from 'date-fns';

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (exp && typeof exp === 'number') {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    // eslint-disable-next-line no-multi-assign
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = `${name}=${value}`;
  // eslint-disable-next-line no-restricted-syntax
  for (const propName in props) {
    updatedCookie += `; ${propName}`;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const prepareDate = (date) => {
  if (!isValid(parseISO(date))) { return null; }
  const currentDate = new Date();
  const parsedDate = parseISO(date);
  switch (true) {
    case isToday(parsedDate): {
      return `Сегодня, ${format(parsedDate, 'kk:mm')} i-GMT+3`;
    }
    case isYesterday(parsedDate): {
      return `Вчера,  ${format(parsedDate, 'kk:mm')} i-GMT+3`;
    }
    default: {
      return `${differenceInCalendarDays(currentDate, parsedDate)} дня назад,  ${format(parsedDate, 'kk:mm')} i-GMT+3`;
    }
  }
};

export const parseStatus = (status) => {
  switch (status) {
    case 'done': {
      return 'Выполнен';
    }
    case 'pending': {
      return 'Готовится';
    }
    case 'created': {
      return 'Создан';
    }
    default: {
      return '';
    }
  }
};

export const getUniqValues = (array) => Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);

export const countById = (array, id) => array.filter((item) => item._id === id).length;
