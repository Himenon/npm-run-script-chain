import * as React from "react";

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
