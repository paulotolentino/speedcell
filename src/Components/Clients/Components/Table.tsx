import React from "react";
import moment from "moment";

import { ClientInterface } from "../../../Redux/Reducers/ClientReducer";
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
  clients: Array<ClientInterface>;
}

const TableComponent: React.SFC<TableProps> = ({ clients }) => {
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
              <TableCellBody align="left">
                {moment(client.nome).format("DD/MM/YYYY hh:mm")}
              </TableCellBody>
              <TableCellBody align="right">{client.cpf}</TableCellBody>
              <TableCellBody align="right">{client.telefone}</TableCellBody>

              <TableCellBody>
                <GroupActionButton>
                  <ActionButton
                    onClick={() => console.log(client.id)}
                    type="primary"
                  >
                    Ver
                  </ActionButton>
                  <ActionButton
                    onClick={() => console.log(client.id)}
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
