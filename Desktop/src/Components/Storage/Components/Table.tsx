import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../Redux/Actions";

import { ProductInterface } from "../../../Redux/Reducers/StorageReducer";
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
  storage: Array<ProductInterface>;
}

const TableComponent: React.SFC<TableProps> = ({ storage }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const dispatchProduct = (product: ProductInterface) => {
    dispatch({
      data: product,
      type: actions.SET_PRODUCT,
    });

    history.push({
      pathname: `/FormProduct`,
    });
  };

  return (
    <TableDiv>
      <Table>
        <thead>
          <TableRowHeader>
            <TableCellHeader align="left">Produto</TableCellHeader>
            <TableCellHeader align="right">Preço Compra</TableCellHeader>
            <TableCellHeader align="right">Preço Venda</TableCellHeader>
            <TableCellHeader align="right">Margem</TableCellHeader>
            <TableCellHeader align="right">Quantidade</TableCellHeader>
            <TableCellHeader align="right">Ultima Modificação</TableCellHeader>
            <TableCellActionHeader>Ação</TableCellActionHeader>
          </TableRowHeader>
        </thead>
        <tbody>
          {storage.map((product) => (
            <TableRowBody key={product.id}>
              <TableCellBody align="left">{product.nome}</TableCellBody>
              <TableCellBody align="right">
                {toMoney(product.preco_compra)}
              </TableCellBody>
              <TableCellBody align="right">
                {toMoney(product.preco_venda)}
              </TableCellBody>
              <TableCellBody align="right">
                {(
                  (product.preco_venda / product.preco_compra - 1) *
                  100
                ).toFixed(2)}
                %
              </TableCellBody>
              <TableCellBody align="right">{product.quantidade}</TableCellBody>
              <TableCellBody align="right">
                {moment(product.data_modificacao).format("DD/MM/YYYY hh:mm")}
              </TableCellBody>
              <TableCellBody>
                <GroupActionButton>
                  <ActionButton
                    onClick={() => dispatchProduct(product)}
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
