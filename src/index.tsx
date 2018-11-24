const Tree = require("paths-js/tree");
import * as React from "react";
import { AnchorProps, makeAnchorList, makeNodeComponent } from "./components";
import { RootTree, TreeConnector, TreeItem, TreeNode } from "./types";

const children = (x: TreeItem): TreeItem[] => {
  if (x.collapsed) {
    return [];
  } else {
    return x.children || [];
  }
};

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
      const position = "translate(" + n.point[0] + "," + n.point[1] + ")";

      const toggle = () => {
        n.item.collapsed = !n.item.collapsed;
        this.forceUpdate();
      };
      const text: any = children(n.item).length > 0 ? makeNodeComponent(n, { x: -10, y: 0 }) : makeNodeComponent(n, { x: 10, y: 0 });
      return (
        <g transform={position} key={`node-${idx}`}>
          <circle fill="white" stroke="black" r="5" cx="0" cy="0" onClick={toggle} />
          {text}
        </g>
      );
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
