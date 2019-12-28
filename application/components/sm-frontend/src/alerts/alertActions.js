export const ADD_ALERT = 'ADD_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export const addAlert = (text, status) => ({
  type: ADD_ALERT,
  payload: {
    text,
    status,
  },
});

export const removeAlert = id => ({
  type: REMOVE_ALERT,
  payload: {
    id,
  },
});
