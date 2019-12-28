import { combineReducers } from 'redux';
import authUserReducer from 'common/reducers/authUserReducer';

export default combineReducers({
  authUser: authUserReducer,
});
