import * as React from "react";
import { renderToString } from "react-dom/server";
import * as App from "./App";
import { makeChain } from "./parser";
import { Package, TreeData } from "./types";

export const IS_BROWSER = typeof window !== "undefined" && "HTMLElement" in window;

export const getPackageJson = (filePath: string): Package => require(filePath);

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

export const generateSsrHtml = (props: App.Props): string => {
  return renderToString(<App.Component {...props} />);
};
