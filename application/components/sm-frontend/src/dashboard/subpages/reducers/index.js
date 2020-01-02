import { combineReducers } from "redux";
import planesReducer from "dashboard/subpages/reducers/planesReducer";
import clientsReducer from "dashboard/subpages/reducers/clientsReducer";
import ticketsReducer from "dashboard/subpages/reducers/ticketsReducer";

export default combineReducers({
  planes: planesReducer,
  clients: clientsReducer,
  tickets: ticketsReducer
});
