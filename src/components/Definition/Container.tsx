import * as Types from "@this/types";
import * as React from "react";
import * as Definition from "./Definiton";
import { Store } from "./Store";

const generateDefinitionItemProps = ({ name, description }: Types.TreeData): Definition.DefinitionItemProps => {
  return {
    tagName: "definition",
    dt: {
      children: name,
    },
    dd: {
      children: description,
    },
  };
};

const generateDefinitionListProps = (treeData: Types.TreeData): Definition.DefinitionListProps => {
  return {
    tagName: "dl",
    definition: generateDefinitionItemProps(treeData),
    children: treeData.children.map(generateDefinitionListProps),
  };
};

const generateProps = ({ treeData }: { treeData: Types.TreeData }): Definition.Props => {
  return {
    dl: {},
    children: [generateDefinitionListProps(treeData)],
  };
};

export const Container = ({ store }: { store: Store }) => {
  return <Definition.Component {...generateProps(store)} />;
};
