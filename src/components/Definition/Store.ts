import * as Domain from "@domain";
import * as Types from "@this/types";

export interface Store {
  currentKey: string;
  treeData: Types.TreeData;
}

export const generateStore = (domainStores: Domain.Stores): Store => ({
  currentKey: domainStores.app.state.currentKey,
  treeData: domainStores.app.state.treeData,
});
