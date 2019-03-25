import classNames from "classnames";
import * as React from "react";
import * as Menu from "./Menu";
import { Store } from "./Store";

const styles = require("../../style.scss");

const generateProps = (key: string, store: Store): Menu.Props => {
  const isActive = key === store.currentKey;
  return {
    li: {
      key,
    },
    a: {
      href: "#",
      className: classNames(styles.navLink, isActive ? styles.active : ""),
      onClick: () => {
        store.updateKey(key);
      },
      children: key,
    },
  };
};

export const Container = ({ store }: { store: Store }) => {
  return (
    <ul className={classNames(styles.nav, styles.flexColumn)}>
      {store.scripts.map(key => {
        return <Menu.Component {...generateProps(key, store)} key={`menu-item-${key}`} />;
      })}
    </ul>
  );
};
