import React from "react";
import { store, history } from "store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import AlertPortal from "alerts/containers/AlertPortal";
import RootRouter from "RootRouter";
import AuthService from 'AuthService';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AuthService>
        <RootRouter />
        <AlertPortal />
      </AuthService>
    </ConnectedRouter>
  </Provider>
);

export default App;
