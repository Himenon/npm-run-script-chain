import * as d3 from "d3";
import * as React from "react";
import * as Types from "../types";
import * as Link from "./TreeLink/Container";
import * as Node from "./TreeNode/Container";

export interface DendrogramProps {
  data: Types.TreeData;
  children?: React.ReactNode;
}

/**
 * https://d3-wiki.readthedocs.io/zh_CN/master/Cluster-Layout/
 * https://wizardace.com/d3-treemap/
 * https://swizec.com/blog/server-side-rendering-d3-chart-react-16/swizec/7824
 */
export class Dendrogram extends React.Component<DendrogramProps, {}> {
  private scale: Types.Adjustment = {
    x: 200,
    y: 400,
    offsetX: 0,
    offsetY: 100,
  };
  constructor(props: DendrogramProps) {
    super(props);
  }
  public render() {
    const data = d3.hierarchy(this.props.data);
    const root = d3.tree<Types.TreeData>()(data);
    const nodes = root.descendants();
    const links = root.links();
    return (
      <svg height={"100%"} width={"100%"}>
        {this.props.children}
        <Link.Container links={links} node={nodes[0]} scale={this.scale} />
        <Node.Container nodes={nodes} scale={this.scale} />
      </svg>
    );
  }
}

export { DendrogramProps as Props, Dendrogram as Component };
