import { combineReducers } from "redux";
import startPageReducer from "start-page/reducers/startPageReducer";

export default combineReducers({
  authData: startPageReducer
});
