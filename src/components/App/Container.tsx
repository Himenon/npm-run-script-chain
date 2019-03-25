import * as Domain from "@domain";
import * as React from "react";
import * as Dendrogram from "../Dendrogram";
import * as Menu from "../Menu";
import * as App from "./App";
import { Store } from "./Store";

const generateProps = (store: Store, stores: Domain.Stores): App.Props => {
  return {
    currentKey: stores.app.state.currentKey,
    npmUrl: stores.app.state.npmUrl,
    Menu: <Menu.Container {...stores} />,
    Dendrogram: <Dendrogram.Container {...stores} />,
  };
};

export const Container = ({ store }: { store: Store }) => {
  const [appState, appDispatcher] = React.useReducer(...store.domainStores.app.params);
  const params: Domain.Stores = {
    app: {
      state: appState,
      dispatch: appDispatcher,
    },
  };
  return <App.Component {...generateProps(store, params)} />;
};
