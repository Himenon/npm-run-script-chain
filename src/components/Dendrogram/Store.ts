import * as Domain from "@domain";
import * as TreeLink from "../TreeLink";
import * as TreeNode from "../TreeNode";

export interface Store {
  treeLinkStore: TreeLink.Store;
  treeNodeStore: TreeNode.Store;
}

export const generateStore = (domainStores: Domain.Stores): Store => {
  return {
    treeNodeStore: TreeNode.generateStore(domainStores),
    treeLinkStore: TreeLink.generateStore(domainStores),
  };
};
