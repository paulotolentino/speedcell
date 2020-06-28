import styled, { css } from "styled-components";
import { Colors } from "../../Colors";

export const TableDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  overflow: auto;
`;

export const Table = styled.table`
  border-radius: 8px;
  border-collapse: collapse;
`;

export const TableRowHeader = styled.tr`
  height: 40px;
`;

const cellHeader = css`
  background-color: ${Colors.Brand.BrandPrimary};
  color: ${Colors.Neutral.LightGray};
  padding: 8px;
  text-align: ${({ align }) => align || "center"};
`;

export const TableCellHeader = styled.th`
  ${cellHeader}
`;

export const TableCellActionHeader = styled.th`
  ${cellHeader}
  width: 100px;
`;

export const TableRowBody = styled.tr`
  height: 40px;
  color: ${Colors.Neutral.DarkGray};
  font-size: 14px;
  border-bottom: 1px solid #ddd;

  :hover {
    background-color: ${Colors.Neutral.LightGray};
  }
`;

export const TableCellBody = styled.th`
  padding: 8px;
  text-align: ${({ align }) => align || "center"};
`;

export const ActionButton = styled.span`
  /* width: 80px; */
  background-color: ${({ type }) =>
    type === "primary"
      ? Colors.Brand.BrandPrimary
      : Colors.Brand.BrandSecondary};
  color: ${Colors.Neutral.LightGray};
  text-align: center;
  border-radius: 6px;
  padding: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${({ type }) =>
      type === "primary"
        ? Colors.Brand.BrandHovered
        : Colors.Brand.BrandBluePrimary};
  }
`;

export const GroupActionButton = styled.div`
  display: flex;
  justify-content: space-evenly;
  /* width: 50px; */
`;
