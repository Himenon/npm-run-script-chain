import * as Domain from "@domain";
import * as Link from "../TreeLink";
import * as Node from "../TreeNode";

export interface Store {
  linkStore: Link.Store;
  nodeStore: Node.Store;
}

export const generateStore = (reducers: Domain.Reducers, domainStores: Domain.Stores): Store => {
  return {
    nodeStore: Node.generateStore(domainStores),
    linkStore: Link.generateStore(reducers),
  };
};
