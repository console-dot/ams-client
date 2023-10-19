import { BASE_URL } from './api/config';

export const getId = () => {
  const ls = getUser();
  return ls?._id;
};

export const getToken = () => localStorage.getItem('@token');

export const getDay = (dateString) => {
  const date = new Date(dateString);
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return daysOfWeek[date.getUTCDay()];
};

export const getDate = (dateString) => {
  const date = new Date(dateString);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${
    months[date.getUTCMonth()]
  } ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
};

export const getTime = (dateString) => {
  const date = new Date(dateString);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  return `${hours > 12 ? hours - 12 : hours}:${minutes} ${amOrPm}`;
};

export const getUser = () => JSON.parse(localStorage.getItem('@user'));

export const getImageUrl = () => {
  const ls = getUser();
  return `${BASE_URL}/file/${ls?.avatar}`;
};

export const getName = () => getUser()?.name;
export const getEmail = () => getUser()?.email;
