import { getId, getToken } from '../utils';
import { BASE_URL } from './config';

// Fetch all leave requests
export const getAllLeaves = () => {
  return fetch(BASE_URL + '/leaves/' + getId(), {
    headers: {
      Authorization: 'JWT ' + getToken(),
    },
  })
    .then((res) => res.json())
    .catch((err) => err);
};

// Post a leave request
export const postLeave = (employeeId, startDate, endDate, reason) => {
  return fetch(BASE_URL + '/leaves', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT ' + getToken(),
    },
    body: JSON.stringify({ employeeId, startDate, endDate, reason }),
  }).then((res) => res.json())
    .catch((err) => err);
};
export const deleteLeave = (leaveId) => {
    return fetch(BASE_URL + '/leaves/' + leaveId, {
      method: 'DELETE',
      headers: {
        Authorization: 'JWT ' + getToken(),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete leave');
        }
        return res.json();
      })
      .catch((err) => {
        console.error('Error deleting leave:', err);
        throw err; 
      });
  };