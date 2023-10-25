export const BASE_URL =
  process.env.REACT_APP_NODE_ENV !== 'local'
    ? 'http://localhost:5000/api/v1'
    : 'https://ams-api.vercel.app/api/v1';
