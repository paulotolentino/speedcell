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
              <TableCellBody align="left">
                {moment(product.data).format("DD/MM/YYYY hh:mm")}
              </TableCellBody>
              <TableCellBody align="right">{product.num_os}</TableCellBody>
              <TableCellBody align="right">{product.id_cliente}</TableCellBody>
              <TableCellBody align="right">
                {toMoney(product.valor)}
              </TableCellBody>
              <TableCellBody align="right">{product.status}</TableCellBody>
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
