import React from "react";
import moment from "moment";

import { ProductInterface } from "../../../Redux/Reducers/StorageReducer";
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
  storage: Array<ProductInterface>;
}

const TableComponent: React.SFC<TableProps> = ({ storage }) => {
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
              <TableCellBody align="right">
                {moment(product.data_modificacao).format("DD/MM/YYYY hh:mm")}
              </TableCellBody>
              <TableCellBody>
                <GroupActionButton>
                  <ActionButton
                    onClick={() => console.log(product.id)}
                    type="primary"
                  >
                    Ver
                  </ActionButton>
                  <ActionButton
                    onClick={() => console.log(product.id)}
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
