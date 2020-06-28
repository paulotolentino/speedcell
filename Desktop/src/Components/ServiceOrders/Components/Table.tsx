import React from "react";
import moment from "moment";

import { ServiceOrderInterface } from "../../../Redux/Reducers/ServiceOrderReducer";
import { toMoney } from "../../../Utils/Money";

import {
  TableDiv,
  Table,
  TableRowHeader,
  TableCellHeader,
  TableCellActionHeader,
  TableRowBody,
  TableCellBody,
  ActionButton,
  GroupActionButton,
} from "../../Global/Table/Table_style";

interface TableProps {
  orders: Array<ServiceOrderInterface>;
}

const TableComponent: React.SFC<TableProps> = ({ orders }) => {
  return (
    <TableDiv>
      <Table>
        <thead>
          <TableRowHeader>
            <TableCellHeader align="left">Data</TableCellHeader>
            <TableCellHeader align="right">OS</TableCellHeader>
            <TableCellHeader align="right">Cliente</TableCellHeader>
            <TableCellHeader align="right">Valor</TableCellHeader>
            <TableCellHeader align="right">Status</TableCellHeader>
            <TableCellActionHeader>Ação</TableCellActionHeader>
          </TableRowHeader>
        </thead>
        <tbody>
          {orders.map((order) => (
            <TableRowBody key={order.id}>
              <TableCellBody align="left">
                {moment(order.data).format("DD/MM/YYYY hh:mm")}
              </TableCellBody>
              <TableCellBody align="right">{order.num_os}</TableCellBody>
              <TableCellBody align="right">{order.id_cliente}</TableCellBody>
              <TableCellBody align="right">
                {toMoney(order.valor)}
              </TableCellBody>
              <TableCellBody align="right">{order.status}</TableCellBody>
              <TableCellBody>
                <GroupActionButton>
                  <ActionButton
                    onClick={() => console.log(order.id)}
                    type="primary"
                  >
                    Ver
                  </ActionButton>
                  <ActionButton
                    onClick={() => console.log(order.id)}
                    type="secondary"
                  >
                    Editar
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
