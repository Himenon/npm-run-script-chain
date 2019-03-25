import * as Types from "@this/types";
import * as React from "react";
import { Store } from "./Store";
import * as TreeNode from "./TreeNode";

const getTransform = (position: { x: number; y: number }) => {
  return `translate(${position.y}, ${position.x})`;
};

const generateProps = (store: Store, node: Types.Node, dispatch: (key: string) => void): TreeNode.Props => {
  const position = {
    x: node.x * store.scale.x + store.scale.offsetX,
    y: node.y * store.scale.y + store.scale.offsetY,
  };
  return {
    g: {
      transform: getTransform(position),
    },
    circle: {
      r: store.radius,
    },
    text: {
      dx: store.radius + 0.5,
      dy: store.offset,
      onClick: () => {
        dispatch(node.data.name);
      },
      children: node.data.name,
    },
  };
};

export const Container = ({ store }: { store: Store }) => {
  const { dispatch } = store.domainStores.app.generateReactState();
  return (
    <>
      {store.nodes.map((node, idx) => {
        return <TreeNode.Component {...generateProps(store, node, dispatch)} key={`node-${idx}`} />;
      })}
    </>
  );
};
