import * as React from "react";
const classNames = require("../index.scss");
import { TreeNode } from "../types";

interface AnchorProps {
  text: string;
  onClick: () => Promise<void> | void;
  children?: React.ReactNode;
  isActive?: boolean;
}

const createAnchors: React.SFC<AnchorProps[]> = (anchors: AnchorProps[]): React.ReactElement<any> => {
  const items = anchors.map(anchor => {
    const className = [classNames.listGroupItem, classNames.listGroupItemAction, anchor.isActive ? classNames.active : ""].join(" ");
    return (
      <li className={className} key={anchor.text} onClick={anchor.onClick}>
        {anchor.text}
      </li>
    );
  });
  return <ul className={classNames.listGroup}>{items}</ul>;
};

const createTextNode = (props: TreeNode, pos: { x: number; y: number }): React.ReactElement<any> => {
  return (
    <text transform={`translate(${pos.x + 15},${pos.y - 10})`} textAnchor="end">
      <a href={`?start=${props.item.name}`}>{props.item.name}</a>
    </text>
  );
};

export { AnchorProps as Props, createAnchors, createTextNode };
