const Tree = require("paths-js/tree");
import * as React from "react";
import { AnchorProps, children, makeAnchorList, makeNodeComponent } from "./components";
import { RootTree, TreeConnector, TreeNode } from "./types";

export interface AppProps {
  tree: RootTree;
  size: {
    width: number;
    height: number;
  };
  anchors: AnchorProps[];
}

export class App extends React.Component<AppProps, {}> {
  public render() {
    const anchorList = makeAnchorList(this.props.anchors);
    return (
      <div id="root">
        {anchorList}
        <div id="tree">
          <svg width="100%" height="100%">
            <g transform="translate(80, 10)">
              {this.curves()}
              {this.nodes()}
            </g>
          </svg>
        </div>
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
      const toggle = () => {
        n.item.collapsed = !n.item.collapsed;
        this.forceUpdate();
      };
      return makeNodeComponent(n, idx, toggle);
    });
  }
}

export const makeProps = (data: any, size: { width: number; height: number }, anchors: AnchorProps[]): AppProps => {
  return {
    tree: Tree({
      data,
      children,
      width: size.width,
      height: size.height,
    }),
    size,
    anchors,
  };
};
