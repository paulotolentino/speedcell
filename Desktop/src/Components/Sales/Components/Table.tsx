import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../Redux/Actions";

import { ProductProps } from "../../../Redux/Reducers/SaleReducer";
import { toMoney } from "../../../Utils/CommonFunctions";

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
  sales: Array<ProductProps>;
}

const TableComponent: React.SFC<TableProps> = ({ sales }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const dispatchClient = (saleId: number) => {
    dispatch({
      data: saleId,
      type: actions.SET_ID_SALE,
    });

    dispatch({
      data: true,
      type: actions.SET_SHOW_SALE,
    });

    history.push({
      pathname: `/FormSale`,
    });
  };

  return (
    <TableDiv>
      <Table>
        <thead>
          <TableRowHeader>
            <TableCellHeader align="left">Venda</TableCellHeader>
            <TableCellHeader align="right">Data</TableCellHeader>
            <TableCellHeader align="right">Cliente</TableCellHeader>
            <TableCellHeader align="right">Valor</TableCellHeader>
            <TableCellActionHeader>Ação</TableCellActionHeader>
          </TableRowHeader>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <TableRowBody key={sale.id}>
              <TableCellBody align="left"># {sale.numero_venda}</TableCellBody>
              <TableCellBody align="right">
                {moment(sale.data).format("DD/MM/YYYY hh:mm")}
              </TableCellBody>
              <TableCellBody align="right">{sale.nome}</TableCellBody>
              <TableCellBody align="right">
                {toMoney(sale.valor - sale.valor_desconto)}
              </TableCellBody>
              <TableCellBody>
                <GroupActionButton>
                  <ActionButton
                    onClick={() => dispatchClient(sale.id)}
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
