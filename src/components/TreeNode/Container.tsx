import * as Domain from "@domain";
import * as Types from "@this/types";
import * as React from "react";
import { Store } from "./Store";
import * as TreeNode from "./TreeNode";

const getTransform = (position: { x: number; y: number }) => {
  return `translate(${position.y}, ${position.x})`;
};

const generateProps = (domainState: Domain.App.State, targetNode: Types.Node, dispatch: Types.Dispatcher): TreeNode.Props => {
  const position = {
    x: targetNode.x * domainState.scale.x + domainState.scale.offsetX,
    y: targetNode.y * domainState.scale.y + domainState.scale.offsetY,
  };
  return {
    g: {
      transform: getTransform(position),
    },
    circle: {
      r: domainState.radius,
    },
    text: {
      dx: domainState.radius + 0.5,
      dy: domainState.offset,
      onClick: () => {
        dispatch({
          type: "UPDATE_KEY",
          currentKey: targetNode.data.name,
        });
      },
      children: targetNode.data.name,
    },
  };
};

export const Container = ({ store }: { store: Store }) => {
  const [domainState, dispatch] = React.useReducer(...store.domainStores.app.params);
  return (
    <>
      {domainState.nodes.map((node, idx) => {
        return <TreeNode.Component {...generateProps(domainState, node, dispatch)} key={`node-${idx}`} />;
      })}
    </>
  );
};
