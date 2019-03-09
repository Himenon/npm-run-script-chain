import * as React from "react";

import * as Types from "../types";
import * as Anchor from "./Anchor";

interface TreeProps {
  tree: Types.RootTree;
  size: {
    width: number;
    height: number;
  };
  anchors: Anchor.Props[];
}

const children = (x: Types.TreeItem): Types.TreeItem[] => {
  if (x.collapsed) {
    return [];
  } else {
    return x.children || [];
  }
};

class Tree extends React.Component<TreeProps, {}> {
  public render() {
    const anchors = Anchor.createAnchors(this.props.anchors);
    return (
      <div id="root">
        {anchors}
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
    return this.props.tree.curves.map((c: Types.TreeConnector, idx: number) => {
      return <path key={`curves-${idx}`} d={c.connector.path.print()} fill="none" stroke="gray" />;
    });
  }

  private nodes() {
    return this.props.tree.nodes.map((n: Types.TreeNode, idx: number) => {
      const position = "translate(" + n.point[0] + "," + n.point[1] + ")";

      const toggle = () => {
        n.item.collapsed = !n.item.collapsed;
        this.forceUpdate();
      };
      const text: any =
        children(n.item).length > 0 ? Anchor.createTextNode(n, { x: -10, y: 0 }) : Anchor.createTextNode(n, { x: 10, y: 0 });
      return (
        <g transform={position} key={`node-${idx}`}>
          <circle fill="white" stroke="black" r="5" cx="0" cy="0" onClick={toggle} />
          {text}
        </g>
      );
    });
  }
}

export { TreeProps as Props, Tree as Component, children };
