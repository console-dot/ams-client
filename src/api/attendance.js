import { getId, getToken } from '../utils';
import { BASE_URL } from './config';

export const getAttendance = () => {
  return fetch(BASE_URL + '/attendance/' + getId(), {
    headers: {
      Authorization: 'JWT ' + getToken(),
    },
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const markAttendance = (employeeId, key) => {
  return fetch(BASE_URL + '/attendance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT ' + getToken(),
    },
    body: JSON.stringify({ employeeId, key }),
  }).then((res) => res.json());
};

export const filterAttendance = (start, end) => {
  return fetch(
    BASE_URL + '/attendance/search/' + getId() + `?start=${start}&end=${end}`,
    {
      headers: {
        Authorization: 'JWT ' + getToken(),
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => err);
};
