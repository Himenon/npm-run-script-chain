export interface TreeConnector {
  path: any;
  centroid: any;
  children: TreeConnector[];
  connector: TreeConnector;
}

export interface TreeItem {
  name: string;
  collapsed: boolean;
  children?: TreeItem[];
}

export interface TreeNode {
  point: any;
  item: TreeItem;
}

export interface RootTree {
  curves: TreeConnector[];
  nodes: TreeNode[];
  children?: RootTree[];
}

export interface TreeReturnValue {
  curves: any;
  nodes: any[];
}

export interface InputRef {
  data: any;
  children: any;
  width: number;
  height: number;
}

export declare function tree(ref: InputRef): TreeReturnValue;
