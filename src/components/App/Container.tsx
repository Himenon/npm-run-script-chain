import * as React from "react";
import * as Dendrogram from "../Dendrogram";
import * as Menu from "../Menu";
import * as App from "./App";
import { Store } from "./Store";

const generateProps = (store: Store): App.Props => {
  return {
    currentKey: store.domainStores.app.currentKey,
    npmUrl: store.domainStores.app.npmUrl,
    MenuContainer: <Menu.Container store={store.menuStore} key="menu" />,
    Dendrogram: <Dendrogram.Container store={store.dendrogram} />,
  };
};

export const Container = ({ store }: { store: Store }) => <App.Component {...generateProps(store)} />;
