import * as d3 from "d3";
import * as React from "react";
import * as Types from "../types";
import * as Link from "./TreeLink/Container";
import * as Node from "./TreeNode";

export interface DendrogramProps {
  data: Types.TreeData;
  children?: React.ReactNode;
}

/**
 * https://d3-wiki.readthedocs.io/zh_CN/master/Cluster-Layout/
 * https://wizardace.com/d3-treemap/
 * https://swizec.com/blog/server-side-rendering-d3-chart-react-16/swizec/7824
 */
export const Dendrogram = (props: DendrogramProps) => {
  const scale: Types.Adjustment = {
    x: 200,
    y: 400,
    offsetX: 0,
    offsetY: 100,
  };
  const data = d3.hierarchy(props.data);
  const root = d3.tree<Types.TreeData>()(data);
  const nodes = root.descendants();
  const links = root.links();
  const treeNodeStore = Node.generateStore(nodes, scale);
  return (
    <svg height={"100%"} width={"100%"}>
      {props.children}
      <Link.Container links={links} node={nodes[0]} scale={scale} />
      {Node.Container(treeNodeStore)}
    </svg>
  );
};

export { DendrogramProps as Props, Dendrogram as Component };
