import { useObserver } from "mobx-react-lite";
import * as React from "react";
import * as App from "./App";
import { Store } from "./Store";

const generateProps = (store: Store): App.Props => {
  return {
    currentKey: store.domainStores.app.currentKey,
    npmUrl: store.domainStores.app.npmUrl,
    menuStore: store.menuStore,
  };
};

export const Container = ({ store }: { store: Store }) => useObserver(() => <App.Component {...generateProps(store)} />);
