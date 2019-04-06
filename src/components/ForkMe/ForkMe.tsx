import * as React from "react";

export interface ForkMeProps {
  url: string;
  className?: string;
}

export const ForkMe = ({ url, className }: ForkMeProps) => {
  return (
    <a href={url} className={className} target="_blank" rel="noopener">
      <img
        width="149"
        height="149"
        src="https://github.blog/wp-content/uploads/2008/12/forkme_right_red_aa0000.png?resize=149%2C149"
        className="attachment-full size-full"
        alt="Fork me on GitHub"
        data-recalc-dims="1"
      />
    </a>
  );
};
