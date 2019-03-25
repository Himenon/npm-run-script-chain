import * as React from "react";
import * as TreeLink from "../TreeLink";
import * as TreeNode from "../TreeNode";
import { Store } from "./Store";

export const Container = ({ store }: { store: Store }) => {
  return (
    <svg height={"100%"} width={"100%"}>
      <TreeLink.Container store={store.treeLinkStore} />
      <TreeNode.Container store={store.treeNodeStore} />
    </svg>
  );
};
