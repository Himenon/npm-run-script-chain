import classNames from "classnames";
import * as React from "react";
import { TreeNode } from "../types";

const styles = require("../style.scss");

interface AnchorProps {
  text: string;
  onClick: () => Promise<void> | void;
  children?: React.ReactNode;
  isActive?: boolean;
}

const createElements: React.SFC<AnchorProps[]> = (anchors: AnchorProps[]): React.ReactElement<any> => {
  const items = anchors.map(item => {
    return (
      <li className={styles.navItem} key={item.text}>
        <span onClick={item.onClick} className={classNames(styles.navLink, item.isActive ? styles.active : "")}>
          {item.text}
        </span>
      </li>
    );
  });
  return <ul className={classNames(styles.nav, styles.flexColumn)}>{items}</ul>;
};

const createTextNode = (props: TreeNode, pos: { x: number; y: number }): React.ReactElement<any> => {
  return (
    <text transform={`translate(${pos.x + 15},${pos.y - 10})`} textAnchor="end">
      <a href={`?start=${props.item.name}`}>{props.item.name}</a>
    </text>
  );
};

export { AnchorProps as Props, createElements, createTextNode };
