import * as React from "react";
import * as Dendrogram from "../Dendrogram";
import * as Menu from "../Menu";
import * as App from "./App";
import { Store } from "./Store";

const generateProps = (store: Store, currentKey: string): App.Props => {
  return {
    currentKey,
    npmUrl: store.domainStores.app.npmUrl,
    Menu: <Menu.Container store={store.menuStore} />,
    Dendrogram: <Dendrogram.Container store={store.dendrogram} />,
  };
};

export const Container = ({ store }: { store: Store }) => {
  const { currentKey } = store.domainStores.app.generateReactState();
  return <App.Component {...generateProps(store, currentKey)} />;
};
