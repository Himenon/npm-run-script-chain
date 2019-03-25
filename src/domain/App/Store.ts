import * as Types from "@this/types";
import * as d3 from "d3";
import { useState } from "react";
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
  treeData: Types.TreeData | undefined;
  pkg: Types.Package;
  currentKey: string;
  scale: Types.Adjustment;
  nodes: Types.Node[];
  links: Types.Link[];
  generateReactState: () => { currentKey: string; dispatch: (key: string) => void };
}

export const generateStore = ({ pkg }: State): Store => {
  const state = {
    currentKey: "build",
  };

  const treeData = generateTreeData(state.currentKey, pkg);
  const data = d3.hierarchy(treeData);
  const root = d3.tree<Types.TreeData>()(data);
  const nodes = root.descendants();
  const links = root.links();

  return {
    npmUrl: "https://www.npmjs.com/package/npm-run-script-chain",
    pkg,
    treeData: generateTreeData(state.currentKey, pkg),
    currentKey: state.currentKey,
    scale: {
      x: 200,
      y: 400,
      offsetX: 0,
      offsetY: 100,
    },
    nodes,
    links,
    generateReactState: () => {
      const [currentKey, dispatch] = useState(state.currentKey);
      return { currentKey, dispatch };
    },
  };
};
