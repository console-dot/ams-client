const localUrl = window.location.hostname;

export const BASE_URL =
  process.env.REACT_APP_NODE_ENV === 'local'
    ? `http://${localUrl}:5000/api/v1`
    : 'https://ams-api.vercel.app/api/v1';

export const WS_URL =
  process.env.REACT_APP_NODE_ENV === 'local'
    ? `http://${localUrl}:5000`
    : 'https://ams-api.vercel.app';
