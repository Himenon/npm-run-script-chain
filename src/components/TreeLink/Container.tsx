import * as Types from "@this/types";
import * as React from "react";
import * as Link from "./TreeLink";

interface ContainerProps {
  scale: Types.Adjustment;
  node: Types.Node;
  links: Types.Link[];
}

const generateProps = (link: Types.Link, scale: Types.Adjustment): Link.Props => {
  return {
    ...link,
    x1: link.source.x * scale.x + scale.offsetX,
    x2: link.target.x * scale.x + scale.offsetX,
    y1: link.source.y * scale.y + scale.offsetY,
    y2: link.target.y * scale.y + scale.offsetY,
  };
};

export class Container extends React.Component<ContainerProps, {}> {
  public render() {
    // const node = this.props.node;
    return this.props.links.map((link, idx) => {
      return <Link.Component {...generateProps(link, this.props.scale)} key={`link-${idx}`} />;
    });
  }
}
