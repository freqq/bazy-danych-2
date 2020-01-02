import React from "react";
import { Switch } from "react-router-dom";
import getPath from "common/utils/path";
import makeLoadable from "common/utils/loadable";
import NotFoundPage from "common/components/NotFoundPage";
import PrivateRoute from "common/components/PrivateRoute";
import LoggedInRoute from "common/components/LoggedInRoute";

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
    <LoggedInRoute exact path={ROOT_PATH} component={LoadableStartPage} />
    <PrivateRoute path={DASHBOARD_PATH} component={LoadableDashboard} />
    <PrivateRoute component={NotFoundPage} />
  </Switch>
);

export default RootRouter;
