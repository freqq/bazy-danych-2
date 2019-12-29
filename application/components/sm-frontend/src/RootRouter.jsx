import React from "react";
import { Route, Switch } from "react-router-dom";
import getPath from "common/utils/path";
import makeLoadable from "common/utils/loadable";
import NotFoundPage from "common/components/NotFoundPage";
import PrivateRoute from "common/components/PrivateRoute";

export const ROOT_PATH = getPath("/");
export const DASHBOARD_PATH = getPath("/admin");

export const LoadableStartPage = makeLoadable(() =>
  import("start-page/containers/StartPage")
);

export const LoadableDashboard = makeLoadable(() =>
  import("dashboard/containers/Dashboard")
);

const RootRouter = () => (
  <Switch>
    <Route exact path={ROOT_PATH} component={LoadableStartPage} />
    <PrivateRoute exact path={DASHBOARD_PATH} component={LoadableDashboard} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default RootRouter;
