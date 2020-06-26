import React from "react";
import { CloseButton, HeaderStyle, Logo } from "./Header_style";
import SpeedCell from "../../../Assets/logo/speedcell-logo.jpg";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

export default function Header() {
  return (
    <HeaderStyle>
      <Logo src={SpeedCell} alt="SpeedCell" />
      <CloseButton onClick={() => window.close()}>
        <CancelOutlinedIcon />
      </CloseButton>
    </HeaderStyle>
  );
}
