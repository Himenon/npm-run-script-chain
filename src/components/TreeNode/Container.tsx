import * as Types from "@this/types";
import * as React from "react";
import { Store } from "./Store";
import * as TreeNode from "./TreeNode";

const getTransform = (position: { x: number; y: number }) => {
  return `translate(${position.y}, ${position.x})`;
};

const generateProps = (store: Store, targetNode: Types.Node): TreeNode.Props => {
  const position = {
    x: targetNode.x * store.scale.x + store.scale.offsetX,
    y: targetNode.y * store.scale.y + store.scale.offsetY,
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
        store.updateKey(targetNode.data.name);
      },
      children: targetNode.data.name,
    },
  };
};

export const Container = ({ store }: { store: Store }) => (
  <>
    {store.nodes.map((node, idx) => {
      return <TreeNode.Component {...generateProps(store, node)} key={`node-${idx}`} />;
    })}
  </>
);
