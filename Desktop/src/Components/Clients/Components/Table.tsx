import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../Redux/Actions";

import { ClientInterface } from "../../../Redux/Reducers/ClientReducer";

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
  clients: Array<ClientInterface>;
}

const TableComponent: React.SFC<TableProps> = ({ clients }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const dispatchClient = (client: ClientInterface) => {
    dispatch({
      data: client,
      type: actions.SET_CLIENT,
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
                    onClick={() => dispatchClient(client)}
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
