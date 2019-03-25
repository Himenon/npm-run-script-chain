import * as Domain from "@domain";
import * as React from "react";
import * as Dendrogram from "../Dendrogram";
import * as Menu from "../Menu";
import * as App from "./App";
import { createViewStores, ViewStore } from "./Store";

const generateProps = (stores: Domain.Stores, viewStore: ViewStore): App.Props => {
  return {
    currentKey: stores.app.state.currentKey,
    npmUrl: stores.app.state.npmUrl,
    Menu: <Menu.Container store={viewStore.menuStore} />,
    Dendrogram: <Dendrogram.Container store={viewStore.dendrogram} />,
  };
};

export const Container = ({ reducers }: { reducers: Domain.Reducers }) => {
  const [appState, appDispatcher] = React.useReducer(...reducers.app);
  const domainStores: Domain.Stores = {
    app: {
      state: appState,
      dispatch: appDispatcher,
    },
  };
  const stores = createViewStores(domainStores);
  return <App.Component {...generateProps(domainStores, stores)} />;
};
