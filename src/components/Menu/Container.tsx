import classNames from "classnames";
import { useObserver } from "mobx-react-lite";
import * as React from "react";
import * as Menu from "./Menu";
import { Store } from "./Store";

const styles = require("../../style.scss");

const generateProps = (store: Store, key: string): Menu.Props => {
  const isActive = key === store.currentKey;
  return {
    li: {
      key,
    },
    a: {
      href: "#",
      className: classNames(styles.navLink, isActive ? styles.active : ""),
      onClick: () => {
        store.onClick(key);
      },
      children: key,
    },
  };
};

export const Container = ({ store }: { store: Store }) =>
  useObserver(() => (
    <ul className={classNames(styles.nav, styles.flexColumn)}>
      {store.scripts.map(key => {
        return <Menu.Component {...generateProps(store, key)} key={`menu-item-${key}`} />;
      })}
    </ul>
  ));
