import * as React from "react";

import * as Types from "../types";
import * as Anchor from "./Anchor";

const PathTree = require("paths-js/tree");

interface TreeProps {
  treeData: Types.TreeData;
}

interface TreeParams {
  tree: Types.RootTree;
  size: {
    width: number;
    height: number;
  };
}

const DEFAULT_TREE_PARAMS: TreeParams = {
  tree: {
    curves: [],
    nodes: [],
  },
  size: {
    width: 960,
    height: 540,
  },
};

const generateTreeParams = (data: any, size: { width: number; height: number }): TreeParams => {
  if (!data) {
    return DEFAULT_TREE_PARAMS;
  }
  return {
    tree: PathTree({
      data,
      children,
      width: size.width,
      height: size.height,
    }),
    size,
  };
};

const children = (x: Types.TreeItem): Types.TreeItem[] => {
  if (x.collapsed) {
    return [];
  } else {
    return x.children || [];
  }
};

class Tree extends React.Component<TreeProps, {}> {
  public render() {
    const params: TreeParams = generateTreeParams(this.props.treeData, DEFAULT_TREE_PARAMS.size);
    return (
      <div id="tree">
        <svg width="100%" height="100%">
          <g transform="translate(80, 10)">
            {this.curves(params)}
            {this.nodes(params)}
          </g>
        </svg>
      </div>
    );
  }

  private curves(params: TreeParams) {
    return params.tree.curves.map((c: Types.TreeConnector, idx: number) => {
      return <path key={`curves-${idx}`} d={c.connector.path.print()} fill="none" stroke="gray" />;
    });
  }

  private nodes(params: TreeParams) {
    return params.tree.nodes.map((n: Types.TreeNode, idx: number) => {
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

export { TreeProps as Props, Tree as Component, children, DEFAULT_TREE_PARAMS as DEFAULT_PROPS };
