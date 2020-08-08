import styled from "styled-components";
import { Fonts } from "../../StyledGuide/typography";

export const ObjectDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const TitleSale = styled.span`
  ${Fonts.Titles.H5}
  width: 70%;
  display: flex;
  justify-content: center;

  margin-bottom: 20px;
`;

export const ValuesDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 30%;
`;
