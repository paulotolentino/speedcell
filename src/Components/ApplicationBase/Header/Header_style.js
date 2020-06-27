import styled from "styled-components";
import { Colors } from "../../Colors";
import { CenteredDataDiv } from "../Navbar/Navbar_style";

export const HeaderStyle = styled.div`
  height: 100px;
  border-bottom: 1px solid ${Colors.Neutral.LightGray};
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-app-region: drag;
`;

export const CloseButton = styled.div`
  -webkit-app-region: no-drag;
  width: 28px;
  height: 28px;
  margin-right: 18px;
  cursor: pointer;
`;

export const NavbarAppIcon = styled(CenteredDataDiv)`
  font-family: "Roboto", sans-serif;
  font-style: italic;
  font-weight: bold;
  color: ${Colors.Neutral.PureBlack};
  /* height: 68px; */
  margin-left: 24px;
`;
