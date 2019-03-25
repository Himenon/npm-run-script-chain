import * as Domain from "@domain";
import * as Dendrogram from "../Dendrogram";
import * as Menu from "../Menu";

export interface Store {
  reducers: Domain.Reducers;
}

export interface ViewStore {
  menuStore: Menu.Store;
  dendrogram: Dendrogram.Store;
}

export const generateStore = (reducers: Domain.Reducers) => {
  return {
    reducers,
  };
};

export const generateApplicationStores = (reducers: Domain.Reducers, stores: Domain.Stores): ViewStore => {
  return {
    menuStore: Menu.generateStore(reducers),
    dendrogram: Dendrogram.generateStore(reducers, stores),
  };
};
