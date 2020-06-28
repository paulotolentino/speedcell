import React from "react";

import { StyledTitle } from "./Title_style.js";

interface TitleProps {
  children: string;
}

export const Title: React.SFC<TitleProps> = ({ children }) => {
  return <StyledTitle> {children}</StyledTitle>;
};
