import React from "react";
import moment from "moment";

import { SaleInterface } from "../../../Redux/Reducers/SaleReducer";
import { toMoney } from "../../../Utils/Money";

import {
  TableDiv,
  Table,
  TableRowHeader,
  TableCellHeader,
  TableRowBody,
  TableCellBody,
  ActionButton,
  GroupActionButton,
  TableCellActionHeader,
} from "../../Global/Table/Table_style";

interface TableProps {
  sales: Array<SaleInterface>;
}

const TableComponent: React.SFC<TableProps> = ({ sales }) => {
  return (
    <TableDiv>
      <Table>
        <thead>
          <TableRowHeader>
            <TableCellHeader align="left">Data</TableCellHeader>
            <TableCellHeader align="right">Venda</TableCellHeader>
            <TableCellHeader align="right">Cliente</TableCellHeader>
            <TableCellHeader align="right">Valor</TableCellHeader>
            <TableCellActionHeader>Ação</TableCellActionHeader>
          </TableRowHeader>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <TableRowBody key={sale.id}>
              <TableCellBody align="left">
                {moment(sale.data).format("DD/MM/YYYY hh:mm")}
              </TableCellBody>
              <TableCellBody align="right">{sale.num_compra}</TableCellBody>
              <TableCellBody align="right">{sale.id_cliente}</TableCellBody>
              <TableCellBody align="right">{toMoney(sale.valor)}</TableCellBody>
              <TableCellBody>
                <GroupActionButton>
                  <ActionButton
                    onClick={() => console.log(sale.id)}
                    type="primary"
                  >
                    Ver
                  </ActionButton>
                </GroupActionButton>
              </TableCellBody>
            </TableRowBody>
          ))}
        </tbody>
      </Table>
    </TableDiv>
  );
};

export default TableComponent;
