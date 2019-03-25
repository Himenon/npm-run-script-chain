import * as Types from "@this/types";
import { State } from "./State";

import * as d3 from "d3";

import { makeChain } from "../../parser";

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
      offsetX: 0,
      offsetY: 100,
    },
    radius: 5,
    offset: 1,
    nodes,
    links,
  };
};
