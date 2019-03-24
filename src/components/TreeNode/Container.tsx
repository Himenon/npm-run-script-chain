import * as Types from "@this/types";
import * as React from "react";
import * as TreeNode from "./TreeNode";

interface ContainerProps {
  scale: Types.Adjustment;
  nodes: Types.Node[];
}

const generateProps = (node: Types.Node, scale: Types.Adjustment): TreeNode.Props => {
  const position = {
    x: node.x * scale.x + scale.offsetX,
    y: node.y * scale.y + scale.offsetY,
  };
  console.log({ ...node });
  // @ts-ignore
  return { ...node, radius: 5, offset: 1, ...position };
};

export class Container extends React.Component<ContainerProps, {}> {
  public render() {
    return this.props.nodes.map((node, idx) => {
      return <TreeNode.Component {...generateProps(node, this.props.scale)} key={`node-${idx}`} />;
    });
  }
}
