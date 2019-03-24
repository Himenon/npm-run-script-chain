import * as Types from "@this/types";
import * as d3 from "d3";
import { makeChain } from "../../parser";
import { State } from "./State";

const generateTreeData = (start: string, pkg: Types.Package): Types.TreeData => {
  const treeData: Types.TreeData = {
    name: start,
    children: [],
  };
  makeChain(treeData, pkg);
  return treeData;
};

export interface Store {
  npmUrl: string;
  updateKey: (key: string) => void;
  treeData: Types.TreeData | undefined;
  pkg: Types.Package;
  currentKey: string;
  scale: Types.Adjustment;
  nodes: Types.Node[];
  links: Types.Link[];
}

export const generateStore = (state: State): Store => {
  const updateKey = (currentKey: string) => {
    console.log("update!!!", currentKey);
    state.currentKey = currentKey;
  };

  const treeData = generateTreeData(state.currentKey, state.pkg);
  const data = d3.hierarchy(treeData);
  const root = d3.tree<Types.TreeData>()(data);
  const nodes = root.descendants();
  const links = root.links();

  return {
    npmUrl: "https://www.npmjs.com/package/npm-run-script-chain",
    updateKey,
    pkg: state.pkg,
    treeData: generateTreeData(state.currentKey, state.pkg),
    currentKey: state.currentKey,
    scale: {
      x: 200,
      y: 400,
      offsetX: 0,
      offsetY: 100,
    },
    nodes,
    links,
  };
};
