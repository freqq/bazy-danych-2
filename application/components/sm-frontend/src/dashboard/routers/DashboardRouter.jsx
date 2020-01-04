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
export const CARRIERS_PATH = getPath("/admin/carriers");
export const CARRIERS_EDIT_PATH = getPath("/admin/carriers/:id");
export const FLIGHTS_PATH = getPath("/admin/flights");
export const FLIGHTS_EDIT_PATH = getPath("/admin/flights/:id");
export const ORDERS_PATH = getPath("/admin/orders");
export const ORDERS_EDIT_PATH = getPath("/admin/orders/:id");
export const USER_PROFILE_PATH = getPath("/admin/profile");

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

export const LoadableCarriers = makeLoadable(() =>
  import("dashboard/subpages/Carriers")
);

export const LoadableFlights = makeLoadable(() =>
  import("dashboard/subpages/Flights")
);

export const LoadableOrders = makeLoadable(() =>
  import("dashboard/subpages/Orders")
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

export const LoadableCarriersEdit = makeLoadable(() =>
  import("dashboard/subpages/CarriersEdit")
);

export const LoadableFlightsEdit = makeLoadable(() =>
  import("dashboard/subpages/FlightsEdit")
);

export const LoadableOrdersEdit = makeLoadable(() =>
  import("dashboard/subpages/OrdersEdit")
);

export const LoadableProfile = makeLoadable(() =>
  import("dashboard/subpages/UserProfile")
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
    <Route exact path={CLIENTS_EDIT_PATH} component={LoadableClientsEdit} />
    <Route exact path={CARRIERS_PATH} component={LoadableCarriers} />
    <Route exact path={CARRIERS_EDIT_PATH} component={LoadableCarriersEdit} />
    <Route exact path={FLIGHTS_PATH} component={LoadableFlights} />
    <Route exact path={FLIGHTS_EDIT_PATH} component={LoadableFlightsEdit} />
    <Route exact path={ORDERS_PATH} component={LoadableOrders} />
    <Route exact path={ORDERS_EDIT_PATH} component={LoadableOrdersEdit} />
    <Route exact path={USER_PROFILE_PATH} component={LoadableProfile} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default DashboardRouter;
