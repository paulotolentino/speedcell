import styled from "styled-components";
import { Colors } from "../../Colors";

export const NavbarStyle = styled.div`
  width: 250px;
  background-color: ${Colors.Brand.BrandSecondary};
  z-index: 15;
  height: 100%;
`;

export const CenteredDataDiv = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
`;

export const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
`;

export const Logo = styled.img`
  /* zoom: 0.5; */
  zoom: 0.09;
`;

export const NavbarDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100%-95px);
`;

export const NavbarItem = styled(CenteredDataDiv)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: ${Colors.Neutral.StandardGray};
  border-right: ${({ isSelected }) =>
    isSelected
      ? `8px solid ${Colors.StateMenuButtons.Selected}`
      : `8px solid ${Colors.StateMenuButtons.BrandSecondary}`};
  height: 80px;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.StateMenuButtons.Hover};
    border-radius: ${({ isSelected }) =>
      isSelected
        ? `8px solid ${Colors.StateMenuButtons.Selected}`
        : `8px solid ${Colors.StateMenuButtons.Hover}`};
  }
`;
