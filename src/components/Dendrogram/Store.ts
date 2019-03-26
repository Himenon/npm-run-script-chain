import * as Domain from "@domain";
import * as Types from "@this/types";
import * as d3 from "d3";
import * as TreeLink from "../TreeLink";
import * as TreeNode from "../TreeNode";
import { makeChain } from "./parser";
import { State } from "./State";

export interface Store {
  treeLinkStore: TreeLink.Store;
  treeNodeStore: TreeNode.Store;
}

const generateTreeData = (start: string, pkg: Types.Package): Types.TreeData => {
  const treeData: Types.TreeData = {
    name: start,
    children: [],
  };
  makeChain(treeData, pkg);
  return treeData;
};

export const generateState = (currentKey: string, pkg: Types.Package): State => {
  const treeData = generateTreeData(currentKey, pkg);
  const data = d3.hierarchy(treeData);
  const root = d3.tree<Types.TreeData>()(data);
  const nodes = root.descendants();
  const links = root.links();
  return {
    scale: {
      x: 200,
      y: 400,
      offsetX: 15,
      offsetY: 100,
    },
    radius: 5,
    offset: 2.5,
    nodes,
    links,
  };
};

export const generateStore = (domainStores: Domain.Stores): Store => {
  const state = generateState(domainStores.app.state.currentKey, domainStores.app.state.pkg);
  return {
    treeNodeStore: TreeNode.generateStore(domainStores, state),
    treeLinkStore: TreeLink.generateStore(state),
  };
};
