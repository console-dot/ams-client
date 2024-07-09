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

const addLeadingZero = (time) => (parseInt(time) > 9 ? time : `0${time}`);

export const getTime = (dateString) => {
  const date = new Date(dateString);

  const hours = date.getUTCHours() + 5;
  const minutes = date.getUTCMinutes();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  return `${addLeadingZero(hours > 12 ? hours - 12 : hours)}:${addLeadingZero(
    minutes
  )} ${amOrPm}`;
};

export const getUser = () => JSON.parse(localStorage.getItem('@user'));

export const getImageUrl = () => {
  const ls = getUser();
  return `${BASE_URL}/file/${ls?.avatar}`;
};

export const formatDateAsApi = (inputDate) => {
  const dateObj = new Date(inputDate);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`
};

export const getName = () => getUser()?.name;
export const getEmail = () => getUser()?.email;
export const getemployeeId = () => getUser()?.employeeId;
