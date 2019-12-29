import { combineReducers } from "redux";
import planesReducer from "dashboard/subpages/reducers/planesReducer";

export default combineReducers({
  planes: planesReducer
});
