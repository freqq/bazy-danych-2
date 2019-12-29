import { combineReducers } from "redux";
import dashboardReducer from "dashboard/reducers/dashboardReducer";

export default combineReducers({
  userData: dashboardReducer
});
