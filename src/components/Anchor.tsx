import * as React from "react";
import { TreeNode } from "../types";

interface AnchorProps {
  text: string;
  onClick: () => Promise<void> | void;
  children?: React.ReactNode;
}

const createAnchors: React.SFC<AnchorProps[]> = (anchors: AnchorProps[]): React.ReactElement<any> => {
  const items = anchors.map(anchor => (
    <li key={anchor.text}>
      <button onClick={anchor.onClick}>{anchor.text}</button>
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
