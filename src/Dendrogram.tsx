import * as d3 from "d3";
import * as React from "react";
import * as uuid from "uuid";
import { TreeData } from "./types";

export interface DendrogramProps {
  data: TreeData;
}

function generateTree(
  rootNode: d3.HierarchyNode<TreeData>,
): { nodes: d3.HierarchyPointNode<TreeData>; links: Array<d3.HierarchyPointLink<TreeData>> } {
  const nodeSize = { x: 140, y: 140 };
  const tree: d3.TreeLayout<TreeData> = d3
    .tree<TreeData>()
    .nodeSize(orientation === "horizontal" ? [nodeSize.y, nodeSize.x] : [nodeSize.x, nodeSize.y])
    .separation((a, b) => (a.parent && b.parent && a.parent.id === b.parent.id ? 1 : 2));
  // .children(d => (d._collapsed ? null : d._children));
  const nodes = tree(rootNode);
  if (nodes.children) {
    nodes.children.forEach(node => {
      node.y = node.depth * 0.1;
    });
  }
  return { nodes, links: nodes.links() };
}

/**
 * https://d3-wiki.readthedocs.io/zh_CN/master/Cluster-Layout/
 * https://wizardace.com/d3-treemap/
 * https://swizec.com/blog/server-side-rendering-d3-chart-react-16/swizec/7824
 */
export class Dendrogram extends React.Component<DendrogramProps, {}> {
  // private graphRef = React.createRef<SVGElement>();
  // private wrapperRef = React.createRef<HTMLDivElement>();
  constructor(props: DendrogramProps) {
    super(props);
  }
  // public componentDidMount() {
  //   this.updateDrawing();
  // }
  // public updateDrawing() {
  //   const wrapper = this.wrapperRef.current;
  //   if (!wrapper) {
  //     return;
  //   }
  //   d3.select(wrapper).selectAll();
  // }
  public render() {
    console.log(this.props.data);
    const { nodes } = generateTree(d3.hierarchy(this.props.data));
    const points = nodes.leaves().map(child => <g key={uuid.v4()} transform={`translate(${child.x}, ${child.y})`} orient="Left" />);
    return (
      <svg width="800" height="600">
        {points}
      </svg>
    );
  }
}
