import * as Domain from "@domain";
import * as React from "react";
import * as Dendrogram from "../Dendrogram";
import * as Menu from "../Menu";
import * as App from "./App";
import { generateApplicationStores, Store, ViewStore } from "./Store";

const generateProps = (stores: Domain.Stores, viewStore: ViewStore): App.Props => {
  return {
    currentKey: stores.app.state.currentKey,
    npmUrl: stores.app.state.npmUrl,
    Menu: <Menu.Container {...stores} />,
    Dendrogram: <Dendrogram.Container stores={stores} nodeStore={viewStore.dendrogram.nodeStore} />,
  };
};

export const Container = ({ store }: { store: Store }) => {
  const [appState, appDispatcher] = React.useReducer(...store.reducers.app);
  const domainStores: Domain.Stores = {
    app: {
      state: appState,
      dispatch: appDispatcher,
    },
  };
  const stores = generateApplicationStores(store.reducers, domainStores);
  return <App.Component {...generateProps(domainStores, stores)} />;
};
