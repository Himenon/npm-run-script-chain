import * as d3 from "d3";
import * as React from "react";
import { TreeData } from "../types";
import * as Link from "./TreeLink";
import * as Node from "./TreeNode";

export interface DendrogramProps {
  data: TreeData;
  children?: React.ReactNode;
}

/**
 * https://d3-wiki.readthedocs.io/zh_CN/master/Cluster-Layout/
 * https://wizardace.com/d3-treemap/
 * https://swizec.com/blog/server-side-rendering-d3-chart-react-16/swizec/7824
 */
export class Dendrogram extends React.Component<DendrogramProps, {}> {
  constructor(props: DendrogramProps) {
    super(props);
  }
  public render() {
    const data = d3.hierarchy(this.props.data);
    const root = d3.tree<TreeData>()(data);
    const nodes = root.descendants();
    const links = root.links();
    return (
      <svg height={600} width={980}>
        {this.props.children}
        {links.map((props, idx) => (
          <Link.Component {...this.generateLinkProps(props, { x: nodes[0].x, y: nodes[0].y })} key={`link-${idx}`} />
        ))}
        {nodes.map((props, idx) => (
          <Node.Component {...this.generateNodeProps(props)} key={`node-${idx}`} />
        ))}
      </svg>
    );
  }
  private generateLinkProps(params: d3.HierarchyPointLink<TreeData>, add: { x: number; y: number }): Link.Props {
    return {
      ...params,
      ...add,
      x1: params.source.x,
      x2: params.target.x,
      y1: params.source.y,
      y2: params.target.y,
    };
  }
  private generateNodeProps(params: d3.HierarchyPointNode<TreeData>): Node.Props {
    // @ts-ignore
    return { ...params, x: 100, y: 100, radius: 1, offset: 1 };
  }
}

export { DendrogramProps as Props, Dendrogram as Component };
