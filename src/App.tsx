import * as Domain from "@domain";
import * as React from "react";
import { App } from "./components";
import { Package } from "./types";

interface MainProps {
  domainStores: Domain.Stores;
}

export const generateDomainStore = (pkg: Package): Domain.Stores => {
  const app = Domain.App.generateStore({ pkg });
  return {
    app,
  };
};

export const Main = ({ domainStores }: MainProps) => {
  const store = App.generateStore(domainStores);
  return <App.Container store={store} />;
};

export { MainProps as Props, Main as Component };
