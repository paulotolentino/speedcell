import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../Redux/Actions";

import { ServiceOrderTableInterface } from "../../../Redux/Reducers/ServiceOrderReducer";
import { toMoney } from "../../../Utils/CommonFunctions";

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
  orders: Array<ServiceOrderTableInterface>;
}

const TableComponent: React.SFC<TableProps> = ({ orders }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const dispatchSo = (saleId: number) => {
    dispatch({
      data: saleId,
      type: actions.SET_ID_SERVICE_ORDERS,
    });

    dispatch({
      data: true,
      type: actions.SET_SHOW_SERVICE_ORDERS,
    });

    history.push({
      pathname: `/FormOs`,
    });
  };

  return (
    <TableDiv>
      <Table>
        <thead>
          <TableRowHeader>
            <TableCellHeader align="left">OS</TableCellHeader>
            <TableCellHeader align="right">Data de entrada</TableCellHeader>
            <TableCellHeader align="right">Cliente</TableCellHeader>
            <TableCellHeader align="right">Equipamento</TableCellHeader>
            <TableCellHeader align="right">Valor</TableCellHeader>
            <TableCellHeader align="right">Forma de pagamento</TableCellHeader>
            <TableCellActionHeader>Ação</TableCellActionHeader>
          </TableRowHeader>
        </thead>
        <tbody>
          {orders.map((order) => (
            <TableRowBody key={order.numero_os}>
              <TableCellBody align="left"># {order.numero_os}</TableCellBody>
              <TableCellBody align="right">
                {moment(order.data_entrada).format("DD/MM/YYYY hh:mm")}
              </TableCellBody>
              <TableCellBody align="right">{order.nome}</TableCellBody>
              <TableCellBody align="right">
                {order.nome_equipamento}
              </TableCellBody>
              <TableCellBody align="right">
                {toMoney(order.valor)}
              </TableCellBody>
              <TableCellBody align="right">
                {order.forma_pagamento}
              </TableCellBody>
              <TableCellBody>
                <GroupActionButton>
                  <ActionButton
                    onClick={() => dispatchSo(order.id)}
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
