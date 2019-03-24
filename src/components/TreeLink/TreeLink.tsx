import * as Types from "@this/types";
import * as React from "react";
const styles = require("../../style.scss");

interface LinkProps extends Types.Link {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

function diagonal(x1, y1, x2, y2) {
  return `M${y1},${x1}C${(y1 + y2) / 2},${x1} ${(y1 + y2) / 2},${x2} ${y2},${x2}`;
}

export default class Link extends React.PureComponent<LinkProps> {
  public render() {
    const d = diagonal(this.props.x1, this.props.y1, this.props.x2, this.props.y2);
    return <path className={styles.link} d={d} />;
  }
}

export { LinkProps as Props, Link as Component };
