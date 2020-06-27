import styled from "styled-components";
import { Colors } from "../../Colors";

export const TableDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
`;

export const Table = styled.table`
  border-radius: 8px;
  border-collapse: collapse;
`;

export const TableRowHeader = styled.tr`
  height: 40px;

  :nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableCellHeader = styled.th`
  background-color: ${Colors.Brand.BrandPrimary};
  color: ${Colors.Neutral.LightGray};
  padding: 8px;
  text-align: ${({ align }) => align || "center"};
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
