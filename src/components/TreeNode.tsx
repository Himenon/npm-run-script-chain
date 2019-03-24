import * as d3 from "d3";
import * as React from "react";
import { TreeData } from "../types";
const styles = require("../style.scss");

export interface NodeProps extends d3.HierarchyPointNode<TreeData> {
  x: number;
  y: number;
  offset: number;
  radius: number;
}

export default class Node extends React.PureComponent<NodeProps, {}> {
  public render() {
    return (
      <g className={styles.node} transform={this.getTransform()}>
        <circle className={styles.circle} r={this.props.radius} />
        <text className={styles.text} dx={this.props.radius + 0.5} dy={this.props.offset}>
          {this.props.data.name}
        </text>
      </g>
    );
  }
  private getTransform() {
    return `translate(${this.props.y}, ${this.props.x})`;
  }
}

export { NodeProps as Props, Node as Component };
