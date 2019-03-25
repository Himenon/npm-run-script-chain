import classNames from "classnames";
import * as React from "react";
import * as Menu from "./Menu";
import { Store } from "./Store";

const styles = require("../../style.scss");

const generateProps = (key: string, currentKey: string, dispatch: (key: string) => void): Menu.Props => {
  const isActive = key === currentKey;
  return {
    li: {
      key,
    },
    a: {
      href: "#",
      className: classNames(styles.navLink, isActive ? styles.active : ""),
      onClick: () => {
        dispatch(key);
      },
      children: key,
    },
  };
};

export const Container = ({ store }: { store: Store }) => {
  const { currentKey, dispatch } = store.domainStores.app.generateReactState();
  return (
    <ul className={classNames(styles.nav, styles.flexColumn)}>
      {store.scripts.map(key => {
        return <Menu.Component {...generateProps(key, currentKey, dispatch)} key={`menu-item-${key}`} />;
      })}
    </ul>
  );
};
