import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../Redux/Actions";

import { ClientTableInterface } from "../../../Redux/Reducers/ClientReducer";

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
  clients: Array<ClientTableInterface>;
}

const TableComponent: React.SFC<TableProps> = ({ clients }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const dispatchClientId = (clientId: number) => {
    dispatch({
      data: clientId,
      type: actions.SET_CLIENT_ID,
    });

    history.push({
      pathname: `/FormClient`,
    });
  };

  return (
    <TableDiv>
      <Table>
        <thead>
          <TableRowHeader>
            <TableCellHeader align="left">Cliente</TableCellHeader>
            <TableCellHeader align="right">CPF</TableCellHeader>
            <TableCellHeader align="right">Telefone</TableCellHeader>
            <TableCellActionHeader>Ação</TableCellActionHeader>
          </TableRowHeader>
        </thead>
        <tbody>
          {clients.map((client) => (
            <TableRowBody key={client.id}>
              <TableCellBody align="left">{client.nome}</TableCellBody>
              <TableCellBody align="right">{client.cpf}</TableCellBody>
              <TableCellBody align="right">{client.telefone}</TableCellBody>

              <TableCellBody>
                <GroupActionButton>
                  <ActionButton
                    onClick={() => dispatchClientId(client.id)}
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
