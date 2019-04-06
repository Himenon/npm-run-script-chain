import * as React from "react";

import { getClassNames } from "../../utils";

export interface DefinitionItemProps {
  tagName: "definition";
  dt: JSX.IntrinsicElements["dt"];
  dd: JSX.IntrinsicElements["dd"];
}

export interface DefinitionListProps {
  tagName: "dl";
  definition: DefinitionItemProps;
  children: Array<DefinitionListProps | DefinitionItemProps>;
}

interface DescriptionProps {
  dl: JSX.IntrinsicElements["dl"];
  children: Array<DefinitionListProps | DefinitionItemProps>;
}

const DefinitionItem = ({ tagName, ...props }: DefinitionItemProps) => {
  return (
    <>
      <dt {...props.dt} />
      <dd {...props.dd} />
    </>
  );
};

const DefinitionList = ({ tagName, ...props }: DefinitionListProps) => {
  return (
    <>
      <DefinitionItem {...props.definition} />
      {props.children.length > 0 && (
        <dl className={getClassNames("nav nav-pills flex-column")}>
          {props.children.map((prop, level) => createChild({ ...prop, level }))}
        </dl>
      )}
    </>
  );
};

const createChild = ({ level, ...prop }: (DefinitionListProps | DefinitionItemProps) & { level: number }) => {
  return prop.tagName === "definition" ? (
    <DefinitionItem {...prop} key={`definition-${level}`} />
  ) : (
    <DefinitionList {...prop} key={`item-${level}`} />
  );
};

const Definition = (props: DescriptionProps) => {
  return (
    <dl className={getClassNames("nav nav-pills flex-column")} {...props.dl}>
      {props.children.map((prop, level) => createChild({ ...prop, level }))}
    </dl>
  );
};

export { DescriptionProps as Props, Definition as Component };
