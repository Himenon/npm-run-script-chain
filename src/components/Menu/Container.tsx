import * as Domain from "@domain";
import classNames from "classnames";
import * as React from "react";
import * as Menu from "./Menu";

const styles = require("../../style.scss");

const generateProps = (key: string, stores: Domain.Stores): Menu.Props => {
  const isActive = key === stores.app.state.currentKey;
  return {
    li: {
      key,
    },
    a: {
      href: "#",
      className: classNames(styles.navLink, isActive ? styles.active : ""),
      onClick: () => {
        stores.app.dispatch({
          type: "UPDATE_KEY",
          currentKey: key,
        });
      },
      children: key,
    },
  };
};

export const Container = (stores: Domain.Stores) => {
  return (
    <ul className={classNames(styles.nav, styles.flexColumn)}>
      {stores.app.state.scripts.map(key => {
        return <Menu.Component {...generateProps(key, stores)} key={`menu-item-${key}`} />;
      })}
    </ul>
  );
};
