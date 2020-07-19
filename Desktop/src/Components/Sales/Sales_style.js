import styled from "styled-components";
import { Colors } from "../Colors";
import { Fonts } from "../StyledGuide/typography";

export const SalesStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 100%;
  height: 70%;

  padding: 30px 50px;
`;

export const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SalesHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
  align-items: center;
`;

export const NewSaleButton = styled.div`
  width: 150px;
  height: 40px;
  border-radius: 20px;
  background-color: ${Colors.Brand.BrandPrimary};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  ${Fonts.Buttons.BT1}
  color: ${Colors.Neutral.LightGray};

  &:hover{
    background-color: ${Colors.Brand.BrandHovered};
  }
`;

export const InputSearch = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 15px;
  color: ${Colors.Neutral.DarkGray};
  font-size: 18px;
  padding: 0px 8px;
  outline: none;
`;
export const SalesDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-bottom: 30px;
  align-items: center;
  ${(between) => (between ? "justify-content : space-between" : "")}
`;

export const Button = styled.div`
  width: 150px;
  height: 40px;
  border-radius: 20px;
  background-color:  ${({ type }) =>
    type === "secondary" ? "#ffb759" : Colors.Brand.BrandPrimary};
   ${({ type }) =>
     type === "secondary"
       ? `border: 2px solid ${Colors.Neutral.DarkGray}`
       : ""};
  cursor: ${({ disabled }) => (disabled ? "no-drop" : "pointer")};
  display: flex;
  justify-content: center;
  align-items: center;
  ${Fonts.Buttons.BT1}
  color: ${({ type }) =>
    type !== "secondary"
      ? Colors.Neutral.LightGray
      : Colors.Brand.BrandSecondary};

  &:hover{
    background-color: ${({ type }) =>
      type !== "secondary" ? Colors.Brand.BrandHovered : "#c99249"};
  }
`;

export const InputText = styled.input`
  width: ${({ width }) => (width ? width : "300px")};
  height: ${({ height }) => (height ? height : "30px")};
  border-radius: ${({ radius }) => (radius ? radius : "15px")};
  color: ${Colors.Neutral.DarkGray};
  font-size: ${({ size }) => (size ? size : "18px")};
  padding: 0px 8px;
  outline: none;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const GroupButtonFooter = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 20px;
  width: 71%;
`;

export const Deduction = styled.span`
  cursor: ${({ disabled }) => (disabled ? "no-drop" : "pointer")};
  margin-left: 10px;
`;
