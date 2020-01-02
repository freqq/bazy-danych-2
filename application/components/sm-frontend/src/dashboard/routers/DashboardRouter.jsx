import React from "react";
import { Route, Switch } from "react-router-dom";
import getPath from "common/utils/path";
import makeLoadable from "common/utils/loadable";
import NotFoundPage from "common/components/NotFoundPage";

export const DASHBOARD_PATH = getPath("/admin");
export const PLANES_PATH = getPath("/admin/planes");
export const PLANES_EDIT_PATH = getPath("/admin/planes/:id");
export const CLIENTS_PATH = getPath("/admin/clients");
export const CLIENTS_EDIT_PATH = getPath("/admin/clients/:id");
export const TICKETS_PATH = getPath("/admin/tickets");
export const TICKETS_EDIT_PATH = getPath("/admin/tickets/:id");

export const LoadableDashbaord = makeLoadable(() =>
  import("dashboard/subpages/Dashboard")
);

export const LoadablePlanes = makeLoadable(() =>
  import("dashboard/subpages/Planes")
);

export const LoadableClients = makeLoadable(() =>
  import("dashboard/subpages/Clients")
);

export const LoadableTickets = makeLoadable(() =>
  import("dashboard/subpages/Tickets")
);

export const LoadablePlanesEdit = makeLoadable(() =>
  import("dashboard/subpages/PlaneEdit")
);

export const LoadableClientsEdit = makeLoadable(() =>
  import("dashboard/subpages/ClientsEdit")
);

export const LoadableTicketsEdit = makeLoadable(() =>
  import("dashboard/subpages/TicketsEdit")
);

const DashboardRouter = () => (
  <Switch>
    <Route exact path={DASHBOARD_PATH} component={LoadableDashbaord} />
    <Route exact path={PLANES_PATH} component={LoadablePlanes} />
    <Route exact path={PLANES_EDIT_PATH} component={LoadablePlanesEdit} />
    <Route exact path={CLIENTS_PATH} component={LoadableClients} />
    <Route exact path={CLIENTS_EDIT_PATH} component={LoadableClientsEdit} />
    <Route exact path={TICKETS_PATH} component={LoadableTickets} />
    <Route exact path={TICKETS_EDIT_PATH} component={LoadableTicketsEdit} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default DashboardRouter;
