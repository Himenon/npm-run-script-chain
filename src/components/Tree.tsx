import * as React from "react";

import * as Types from "@this/types";
import * as Button from "./Button";

const PathTree = require("paths-js/tree");

interface TreeProps {
  treeData: Types.TreeData;
  onClick: (key: string) => void;
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
        <svg width={`${params.size.width}px`} height={`${params.size.height}px`}>
          <g transform="translate(100, 40) scale(0.75)">
            {this.curves(params)}
            {this.nodes(params, this.props.onClick)}
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

  private nodes(params: TreeParams, onClick: (key: string) => void) {
    return params.tree.nodes.map((n: Types.TreeNode, idx: number) => {
      const x = isNaN(n.point[0]) ? 0 : n.point[0];
      const y = isNaN(n.point[0]) ? DEFAULT_TREE_PARAMS.size.height / 2 : n.point[1];
      const position = "translate(" + x + "," + y + ")";
      const toggle = () => {
        n.item.collapsed = !n.item.collapsed;
        this.forceUpdate();
      };
      const text: any = Button.createTextNode(n, { x: children(n.item).length > 0 ? -10 : 10, y: 0 }, onClick);
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
