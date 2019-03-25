import * as Domain from "@domain";
import * as React from "react";
import * as Dendrogram from "../Dendrogram";
import * as Menu from "../Menu";
import * as App from "./App";
import { Store } from "./Store";

const generateProps = (store: Store, domainState: Domain.App.State): App.Props => {
  return {
    currentKey: domainState.currentKey,
    npmUrl: domainState.npmUrl,
    Menu: <Menu.Container store={store.menuStore} />,
    Dendrogram: <Dendrogram.Container store={store.dendrogram} />,
  };
};

export const Container = ({ store }: { store: Store }) => {
  const domainState = React.useReducer(...store.domainStores.app.params)[0];
  return <App.Component {...generateProps(store, domainState)} />;
};
