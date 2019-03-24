import * as React from "react";
import { App } from "./components";
import { Package } from "./types";

interface MainProps {
  raw: Package;
}

export const Main = ({ raw: pkg }: MainProps) => {
  const store = App.generateStore(pkg, "build");
  return <App.Container store={store} />;
};

export { MainProps as Props, Main as Component };
