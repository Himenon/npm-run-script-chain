const Tree = require("paths-js/tree");
import * as React from "react";
import { RootTree, TreeConnector, TreeItem, TreeNode } from "./types";

function children(x: TreeItem): TreeItem[] {
  if (x.collapsed) {
    return [];
  } else {
    return x.children || [];
  }
}

export interface AppProps {
  tree: RootTree;
}

export class App extends React.Component<AppProps, {}> {
  public render() {
    return (
      <div id="tree">
        <svg width="500" height="380">
          <g transform="translate(80, 10)">
            {this.curves()}
            {this.nodes()}
          </g>
        </svg>
      </div>
    );
  }

  private curves() {
    return this.props.tree.curves.map((c: TreeConnector, idx: number) => {
      return <path key={`curves-${idx}`} d={c.connector.path.print()} fill="none" stroke="gray" />;
    });
  }

  private nodes() {
    return this.props.tree.nodes.map((n: TreeNode, idx: number) => {
      const position = "translate(" + n.point[0] + "," + n.point[1] + ")";

      const toggle = () => {
        n.item.collapsed = !n.item.collapsed;
        this.forceUpdate();
      };
      const text: any =
        children(n.item).length > 0 ? (
          <text transform="translate(-10,0)" textAnchor="end">
            {n.item.name}
          </text>
        ) : (
          <text transform="translate(10,0)" textAnchor="start">
            {n.item.name}
          </text>
        );
      return (
        <g transform={position} key={`node-${idx}`}>
          <circle fill="white" stroke="black" r="5" cx="0" cy="0" onClick={toggle} />
          {text}
        </g>
      );
    });
  }
}

export const makeProps = (data: any, width: number, height: number): AppProps => {
  return {
    tree: Tree({
      data,
      children,
      width,
      height,
    }),
  };
};
