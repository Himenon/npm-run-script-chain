import { TreeData } from "@this/types";
import * as d3 from "d3";
import * as React from "react";
const styles = require("../../style.scss");

export interface NodeProps extends d3.HierarchyPointNode<TreeData> {
  x: number;
  y: number;
  offset: number;
  radius: number;
}

export default class Node extends React.PureComponent<NodeProps, {}> {
  public render() {
    const x = this.props.x;
    const y = this.props.y;
    return (
      <g className={styles.node} transform={this.getTransform(x, y)}>
        <circle className={styles.circle} r={this.props.radius} />
        <text className={styles.text} dx={this.props.radius + 0.5} dy={this.props.offset}>
          {this.props.data.name}
        </text>
      </g>
    );
  }
  private getTransform(x: number, y: number) {
    return `translate(${y}, ${x})`;
  }
}

export { NodeProps as Props, Node as Component };
