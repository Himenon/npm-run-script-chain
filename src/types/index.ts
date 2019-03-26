export interface Package {
  scripts: {
    [key: string]: string;
  };
}

export interface TreeData {
  name: string;
  children: TreeData[];
}

export type Link = d3.HierarchyPointLink<TreeData>;

export type Node = d3.HierarchyPointNode<TreeData>;

export interface InitialProps {
  pkg: Package;
}
