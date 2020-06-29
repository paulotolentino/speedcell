import styled from "styled-components";
import { Colors } from "../Colors";
import { Fonts } from "../StyledGuide/typography";

export const StorageStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 100%;
  height: 70%;

  padding: 30px 50px;
`;

export const StorageHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
  align-items: center;
`;

export const StorageDiv = styled.div`
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
  cursor: pointer;
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
`;
