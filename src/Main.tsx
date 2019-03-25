import { observer } from "mobx-react-lite";
import * as React from "react";
import { App } from "./components";

interface MainProps {
  store: App.Store;
}

export const Main = observer(({ store }: MainProps) => {
  return <App.Container store={store} />;
});

export { MainProps as Props, Main as Component };
