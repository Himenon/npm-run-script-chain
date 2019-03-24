import * as Types from "@this/types";
import { useObserver } from "mobx-react-lite";
import * as React from "react";
import { Store } from "./Store";
import * as TreeNode from "./TreeNode";

const generateProps = (store: Store, node: Types.Node): TreeNode.Props => {
  const position = {
    x: node.x * store.scale.x + store.scale.offsetX,
    y: node.y * store.scale.y + store.scale.offsetY,
  };
  console.log({ ...node });
  // @ts-ignore
  return { ...node, radius: 5, offset: 1, ...position };
};

export const Container = (store: Store) =>
  useObserver(() =>
    store.nodes.map((node, idx) => {
      return <TreeNode.Component {...generateProps(store, node)} key={`node-${idx}`} />;
    }),
  );
