import * as React from "react";
import { TreeItem, TreeNode } from "./types";

export const children = (x: TreeItem): TreeItem[] => {
  if (x.collapsed) {
    return [];
  } else {
    return x.children || [];
  }
};

export interface AnchorProps {
  text: string;
  href: string;
}

export const makeAnchorList = (props: AnchorProps[]): React.ReactElement<any> => {
  const items = props.map(anchor => (
    <li key={anchor.text}>
      <a href={anchor.href}>{anchor.text}</a>
    </li>
  ));
  return <ul id="menu">{items}</ul>;
};

export const makeNodeComponent = (props: TreeNode, idx: number, onClick: () => void): React.ReactElement<any> => {
  const position = "translate(" + props.point[0] + "," + props.point[1] + ")";
  const pos = {
    x: children(props.item).length > 0 ? -10 : 10,
    y: 0,
  };
  return (
    <g transform={position} key={`node-${idx}`}>
      <circle fill="white" stroke="black" r="5" cx="0" cy="0" onClick={onClick} />
      <text transform={`translate(${pos.x},${pos.y})`} textAnchor="end">
        <a href={`?start=${props.item.name}`}>{props.item.name}</a>
      </text>
    </g>
  );
};
