import * as Domain from "@domain";
import * as React from "react";
import * as Dendrogram from "../Dendrogram";
import * as Menu from "../Menu";
import * as App from "./App";
import { createViewStore, ViewStore } from "./Store";

const generateProps = (stores: Domain.Stores, viewStore: ViewStore): App.Props => {
  return {
    currentKey: stores.app.state.currentKey,
    npmUrl: stores.app.state.npmUrl,
    Menu: <Menu.Container store={viewStore.menuStore} />,
    Dendrogram: <Dendrogram.Container store={viewStore.dendrogram} />,
  };
};

export const Container = ({ reducers }: { reducers: Domain.Reducers }) => {
  const createReducer = <T, S>([state, dispatch]: [T, S]): { state: T; dispatch: S } => ({ state, dispatch });
  const domainStores: Domain.Stores = {
    app: createReducer(React.useReducer(...reducers.app)),
  };
  const viewStore = createViewStore(domainStores);
  return <App.Component {...generateProps(domainStores, viewStore)} />;
};
