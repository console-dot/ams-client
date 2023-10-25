import { BASE_URL } from './config';

export const login = (data) => {
  return fetch(BASE_URL + '/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const forget = (data) => {
  return fetch(BASE_URL + '/auth/forget-password', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const reset = (data) => {
  return fetch(BASE_URL + '/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
      return err;
    });
};
