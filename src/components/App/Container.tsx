import * as Domain from "@domain";
import * as React from "react";
import * as Definition from "../Definition";
import * as Dendrogram from "../Dendrogram";
import * as Menu from "../Menu";
import * as App from "./App";
import { createViewStore, ViewStore } from "./Store";

const generateProps = (stores: Domain.Stores, viewStore: ViewStore): App.Props => {
  return {
    library: stores.app.state.library,
    currentKey: stores.app.state.currentKey,
    npmUrl: stores.app.state.npmUrl,
    Menu: <Menu.Container store={viewStore.menu} />,
    Dendrogram: <Dendrogram.Container store={viewStore.dendrogram} />,
    Description: <Definition.Container store={viewStore.description} />,
  };
};

export const Container = ({ reducers }: { reducers: Domain.Reducers }) => {
  const createReducer = <T, S>([state, dispatch]: [T, S]): { state: T; dispatch: S } => ({ state, dispatch });
  const domainStores: Domain.Stores = {
    app: createReducer(React.useReducer(...reducers.app)),
    dendrogram: createReducer(React.useReducer(...reducers.dendrogram)),
  };
  const viewStore = createViewStore(domainStores);
  return <App.Component {...generateProps(domainStores, viewStore)} />;
};
