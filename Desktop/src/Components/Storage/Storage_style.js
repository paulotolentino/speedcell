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

export const NewProductButton = styled.div`
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
