import { combineReducers } from "redux";
import planesReducer from "dashboard/subpages/reducers/planesReducer";
import clientsReducer from "dashboard/subpages/reducers/clientsReducer";

export default combineReducers({
  planes: planesReducer,
  clients: clientsReducer
});
