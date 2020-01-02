import { combineReducers } from "redux";
import planesReducer from "dashboard/subpages/reducers/planesReducer";
import clientsReducer from "dashboard/subpages/reducers/clientsReducer";
import ticketsReducer from "dashboard/subpages/reducers/ticketsReducer";
import carriersReducer from "dashboard/subpages/reducers/carriersReducer";

export default combineReducers({
  planes: planesReducer,
  clients: clientsReducer,
  tickets: ticketsReducer,
  carriers: carriersReducer
});
