import * as Domain from "@domain";
import * as Types from "@this/types";
import classNames from "classnames";
import * as React from "react";
import * as Menu from "./Menu";
import { Store } from "./Store";

const styles = require("../../style.scss");

const generateProps = (key: string, domainState: Domain.App.State, dispatch: Types.Dispatcher): Menu.Props => {
  const isActive = key === domainState.currentKey;
  return {
    li: {
      key,
    },
    a: {
      href: "#",
      className: classNames(styles.navLink, isActive ? styles.active : ""),
      onClick: () => {
        dispatch({
          type: "UPDATE_KEY",
          currentKey: key,
        });
      },
      children: key,
    },
  };
};

export const Container = ({ store }: { store: Store }) => {
  const [domainState, dispatch] = React.useReducer(...store.domainStores.app.params);
  return (
    <ul className={classNames(styles.nav, styles.flexColumn)}>
      {domainState.scripts.map(key => {
        return <Menu.Component {...generateProps(key, domainState, dispatch)} key={`menu-item-${key}`} />;
      })}
    </ul>
  );
};
