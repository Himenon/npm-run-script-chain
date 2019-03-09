import * as React from "react";
import { TreeNode } from "../types";

interface AnchorProps {
  text: string;
  href: string;
}

const createAnchors = (anchors: AnchorProps[]): React.ReactElement<any> => {
  const items = anchors.map(anchor => (
    <li key={anchor.text}>
      <a href={anchor.href}>{anchor.text}</a>
    </li>
  ));
  return <ul id="menu">{items}</ul>;
};

const createTextNode = (props: TreeNode, pos: { x: number; y: number }): React.ReactElement<any> => {
  return (
    <text transform={`translate(${pos.x},${pos.y})`} textAnchor="end">
      <a href={`?start=${props.item.name}`}>{props.item.name}</a>
    </text>
  );
};

export { AnchorProps as Props, createAnchors, createTextNode };
