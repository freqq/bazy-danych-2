import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { createBrowserHistory } from "history";
import thunkMiddleware from "redux-thunk";
import alertReducer from "alerts/alertReducer";
import commonReducer from "common/reducers";

export const history = createBrowserHistory();

const middleware = [thunkMiddleware, routerMiddleware(history)];

let composeEnhancers = compose;

if (
  process.env.NODE_ENV === "development" &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function"
) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
}

const rootReducer = combineReducers({
  alerts: alertReducer,
  router: routerReducer,
  common: commonReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
