/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/prefer-default-export
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
  console.log(updatedCookie);
  document.cookie = updatedCookie;
}

// export const setCookie = (name, value) => {
//   document.cookie = `${name}=${value}`;
// };

export function getCookie(name) {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// export const getCookie = (name) => {
//   const cookiesArr = document.cookie.split('; ');
//   const cookie = cookiesArr.find((el) => el.includes(name));
//   return cookie.split('=')[1];
// };

export const accessToken = (tokenWithShema) => {
  console.log(tokenWithShema);
};
