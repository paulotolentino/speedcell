import React from "react";
import { CloseButton, HeaderStyle, NavbarAppIcon } from "./Header_style";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

export default function Header() {
  return (
    <HeaderStyle>
      <NavbarAppIcon>TechBox Systems - Sistema de Gestão VOEC</NavbarAppIcon>
      <CloseButton onClick={() => window.close()}>
        <CancelOutlinedIcon />
      </CloseButton>
    </HeaderStyle>
  );
}
