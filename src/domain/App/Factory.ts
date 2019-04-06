import * as Types from "@this/types";
import * as d3 from "d3";
import { makeChain } from "./parser";
import { State } from "./State";

const generateTreeData = (name: string, pkg: Types.Package): Types.TreeData => {
  const treeData: Types.TreeData = {
    name,
    description: pkg.scripts[name] || "",
    children: [],
  };
  return makeChain(treeData, pkg);
};

export const generateState = (currentKey: string, pkg: Types.Package): State => {
  const treeData = generateTreeData(currentKey, pkg);
  const data = d3.hierarchy(treeData);
  const root = d3.tree<Types.TreeData>()(data);
  const nodes = root.descendants();
  const links = root.links();
  return {
    npmUrl: "https://www.npmjs.com/package/npm-run-script-chain",
    nodes,
    links,
    currentKey,
    pkg,
    scripts: Object.keys(pkg.scripts),
    treeData,
  };
};
