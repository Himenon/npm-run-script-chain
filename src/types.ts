export interface TreeData {
  name: string;
  script: string;
  children?: TreeData[];
}

export interface TreeConnector {
  path: any;
  centroid: any;
  children: TreeConnector[];
  connector: TreeConnector;
}

export interface TreeItem extends TreeData {
  collapsed: boolean;
  children?: TreeItem[];
}

export interface TreeNode {
  point: Array<[number, number]>;
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
  data: TreeData;
  children: any;
  width: number;
  height: number;
}

export declare function tree(ref: InputRef): TreeReturnValue;
