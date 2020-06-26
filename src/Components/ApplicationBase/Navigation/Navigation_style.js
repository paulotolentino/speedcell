import styled, { createGlobalStyle } from "styled-components";
import { Colors } from "../../Colors";
import { Font } from "../../StyledGuide/typography";

export const GlobalStyle = createGlobalStyle`
  body{
    font-family: ${Font.Family};
    color: ${Colors.Neutral.DarkGray};
    padding: 0;
    margin: 0;
  }
  div{
    -webkit-touch-callout:none;
    user-select: none; 
  }
`;

export const Container = styled.div`
  width: 100%;
`;

export const ContainerRender = styled.div`
  height: 641px;
  display: flex;
  justify-content: center;
`;
