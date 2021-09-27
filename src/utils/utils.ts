/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
import {
  isToday, isYesterday, isValid, differenceInCalendarDays, parseISO, format,
} from 'date-fns';
import { IIngredient } from '../types/data';

export function setCookie(name:string, value:string, props:any) {
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

export function getCookie(name:string) {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const prepareDate = (date:string) => {
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

export const parseStatus = (status:string) => {
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

export const getUniqValues = (array:IIngredient[]): IIngredient[] => Array.from(new Set(array.map((el) => JSON.stringify(el))))
  .map((el) => JSON.parse(el));
export const countById = (array:IIngredient[], id:string) => array.filter((item) => item._id === id).length;
