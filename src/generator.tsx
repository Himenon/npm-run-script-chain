import { Anchor } from "./components";
import { makeChain, Package } from "./parser";
import { TreeData } from "./types";

export const getPackageJson = (filePath: string): Package => require(filePath);
export const generateAnchorsProps = (keys: string[], { hostname }: { hostname?: string }): Anchor.Props[] =>
  keys.map(key => ({
    text: key,
    href: `http://${hostname}/?start=${key}`,
  }));
export const generateTreeData = (start: string | undefined, pkg: Package): TreeData | undefined => {
  if (!start) {
    return undefined;
  }
  const treeData: TreeData = {
    name: start,
    children: [],
  };
  makeChain(treeData, pkg);
  return treeData;
};
