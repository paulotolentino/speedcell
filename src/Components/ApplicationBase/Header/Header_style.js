import styled from "styled-components";
import { Colors } from "../../Colors";

export const HeaderStyle = styled.div`
  height: 100px;
  border-bottom: 1px solid ${Colors.Neutral.LightGray};
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-app-region: drag;
`;

export const Logo = styled.img`
  height: 100px;
`;

export const CloseButton = styled.div`
  -webkit-app-region: no-drag;
  width: 28px;
  height: 28px;
  margin-right: 18px;
  cursor: pointer;
`;
