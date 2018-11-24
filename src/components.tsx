import * as React from "react";
import { TreeNode } from "./types";

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

export const makeNodeComponent = (props: TreeNode, pos: { x: number; y: number }): React.ReactElement<any> => {
  return (
    <text transform={`translate(${pos.x},${pos.y})`} textAnchor="end">
      <a href={`?start=${props.item.name}`}>{props.item.name}</a>
    </text>
  );
};
