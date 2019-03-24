import * as Domain from "@domain";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { App } from "./components";
import { Package } from "./types";

interface MainProps {
  domainStores: Domain.Stores;
}

export const generateDomainStore = (pkg: Package): Domain.Stores => {
  const state: Domain.App.State = { currentKey: "build", pkg };
  const app = Domain.App.generateStore(state);
  return {
    app,
  };
};

export const Main = observer(({ domainStores }: MainProps) => {
  const store = App.generateStore(domainStores);
  return <App.Container store={store} />;
});

export { MainProps as Props, Main as Component };
