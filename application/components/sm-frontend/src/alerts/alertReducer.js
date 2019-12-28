import { generate } from 'shortid';
import { ADD_ALERT, REMOVE_ALERT } from 'alerts/alertActions';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_ALERT:
      return [
        ...state,
        {
          ...action.payload,
          id: generate(),
        },
      ];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload.id);
    default:
      return state;
  }
};
