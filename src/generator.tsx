import { makeChain } from "./parser";
import { Package, TreeData } from "./types";

export const IS_BROWSER = typeof window !== "undefined" && "HTMLElement" in window;

export const generateTreeData = (start: string | undefined | null, pkg: Package): TreeData | undefined => {
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
