import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as actions from "../../../Redux/Actions";
import { globalUrl } from "../../../Utils/GlobalURL";

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
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [previusPage, setPreviusPage] = useState(1);
  const [nextPage, setNextPage] = useState(2);

  const dispatchClient = (client: ClientInterface) => {
    dispatch({
      data: client,
      type: actions.SET_CLIENT,
    });

    history.push({
      pathname: `/FormClient`,
    });
  };

  useEffect(() => {
    axios
      .get(`${globalUrl}/clientes`)
      .then(function (response) {
        // handle success
        setCurrentPage(response.data.currentPage);
        setPreviusPage(response.data.previusPage);
        setNextPage(response.data.nextPage);
        setLoading(false);
        return dispatch({
          data: response.data.clients,
          type: actions.SET_CLIENTS,
        });
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        alert(error);
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <span>Carregando</span>
  ) : (
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
                    Ver / Editar
                  </ActionButton>
                </GroupActionButton>
              </TableCellBody>
            </TableRowBody>
          ))}
        </tbody>
      </Table>
      <span>
        {previusPage}, {currentPage}, {nextPage}
      </span>
    </TableDiv>
  );
};

export default TableComponent;
