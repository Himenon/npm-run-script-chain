import { Observer, useObserver } from "mobx-react-lite";
import * as React from "react";
import * as Dendrogram from "../Dendrogram";
import * as Menu from "../Menu";
import * as App from "./App";
import { Store } from "./Store";

const generateProps = (store: Store): App.Props => {
  return {
    currentKey: store.domainStores.app.currentKey,
    npmUrl: store.domainStores.app.npmUrl,
    MenuContainer: <Observer>{() => <Menu.Container store={store.menuStore} key="menu" />}</Observer>,
    Dendrogram: <Observer>{() => <Dendrogram.Container store={store.dendrogram} />}</Observer>,
  };
};

export const Container = ({ store }: { store: Store }) => useObserver(() => <App.Component {...generateProps(store)} />);
