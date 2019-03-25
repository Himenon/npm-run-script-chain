import * as Domain from "@domain";
import * as Types from "@this/types";
import * as React from "react";
import * as TreeNode from "./TreeNode";

const getTransform = (position: { x: number; y: number }) => {
  return `translate(${position.y}, ${position.x})`;
};

const generateProps = (stores: Domain.Stores, targetNode: Types.Node): TreeNode.Props => {
  const position = {
    x: targetNode.x * stores.app.state.scale.x + stores.app.state.scale.offsetX,
    y: targetNode.y * stores.app.state.scale.y + stores.app.state.scale.offsetY,
  };
  return {
    g: {
      transform: getTransform(position),
    },
    circle: {
      r: stores.app.state.radius,
    },
    text: {
      dx: stores.app.state.radius + 0.5,
      dy: stores.app.state.offset,
      onClick: () => {
        stores.app.dispatch({
          type: "UPDATE_KEY",
          currentKey: targetNode.data.name,
        });
      },
      children: targetNode.data.name,
    },
  };
};

export const Container = (stores: Domain.Stores) => {
  return (
    <>
      {stores.app.state.nodes.map((node, idx) => {
        return <TreeNode.Component {...generateProps(stores, node)} key={`node-${idx}`} />;
      })}
    </>
  );
};
