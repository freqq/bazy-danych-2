import React from "react";
import { Route, Switch } from "react-router-dom";
import getPath from "common/utils/path";
import makeLoadable from "common/utils/loadable";
import NotFoundPage from "common/components/NotFoundPage";

export const ROOT_PATH = getPath("/");

export const LoadableStartPage = makeLoadable(() =>
  import("start-page/containers/StartPage")
);

const RootRouter = () => (
  <Switch>
    <Route exact path={ROOT_PATH} component={LoadableStartPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default RootRouter;
