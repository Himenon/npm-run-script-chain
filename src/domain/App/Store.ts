import * as Types from "@this/types";
import { makeChain } from "../../parser";

// const IS_BROWSER = typeof window !== "undefined" && "HTMLElement" in window;

const generateTreeData = (start: string | undefined | null, pkg: Types.Package): Types.TreeData | undefined => {
  if (!start) {
    return undefined;
  }
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
}

export const generateStore = (pkg: Types.Package, currentKey: string): Store => {
  return {
    npmUrl: "https://www.npmjs.com/package/npm-run-script-chain",
    updateKey: (key: string) => undefined,
    pkg,
    treeData: generateTreeData(currentKey, pkg),
    currentKey,
  };
};
