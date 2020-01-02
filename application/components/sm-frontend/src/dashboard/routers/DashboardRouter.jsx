import React from "react";
import { Route, Switch } from "react-router-dom";
import getPath from "common/utils/path";
import makeLoadable from "common/utils/loadable";
import NotFoundPage from "common/components/NotFoundPage";

export const DASHBOARD_PATH = getPath("/admin");
export const PLANES_PATH = getPath("/admin/planes");
export const PLANES_EDIT_PATH = getPath("/admin/planes/:id");

export const LoadableDashbaord = makeLoadable(() =>
  import("dashboard/subpages/Dashboard")
);

export const LoadablePlanes = makeLoadable(() =>
  import("dashboard/subpages/Planes")
);

export const LoadablePlanesEdit = makeLoadable(() =>
  import("dashboard/subpages/PlaneEdit")
);

const DashboardRouter = () => (
  <Switch>
    <Route exact path={DASHBOARD_PATH} component={LoadableDashbaord} />
    <Route exact path={PLANES_PATH} component={LoadablePlanes} />
    <Route exact path={PLANES_EDIT_PATH} component={LoadablePlanesEdit} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default DashboardRouter;
