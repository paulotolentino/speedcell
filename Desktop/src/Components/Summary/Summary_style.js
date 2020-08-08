import styled from "styled-components";
import { Fonts } from "../StyledGuide/typography";
import { Colors } from "../Colors";

export const SummaryPrincipal = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SummaryItem = styled.div`
  height: 350px;
  width: 42%;
  box-shadow: 3px 3px 3px #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 24px;

  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const SummaryTitle = styled.span`
  ${Fonts.Titles.H5}
  color: ${Colors.Neutral.DarkGray};
`;

export const SummarySubtitle = styled.span`
  ${Fonts.Titles.H6}
  color: ${Colors.Neutral.DarkGray};
  padding-left: 24px;
`;

export const SummaryCard = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 3px 3px 3px #ccc;
  margin-bottom: 16px;
  border-radius: 5px;
  background-color: ${Colors.Neutral.PureWhite};
  border: 1px solid #ccc;
  padding: 16px;
  height: 60px;
`;

export const SummaryValues = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row ? "row" : "column")};
  align-items: flex-end;
  width: 100%;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;
