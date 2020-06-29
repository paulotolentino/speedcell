import React from "react";

import {
  StorageStyle,
  StorageDiv,
  InputText,
  FormGroup,
  Button,
  GroupButtonFooter,
} from "../Storage_style";
import { Title } from "../../Global";

interface ProductRegisterProps {}

const ProductRegisterForm: React.SFC<ProductRegisterProps> = () => {
  return (
    <StorageStyle>
      <Title>Estoque</Title>
      <StorageDiv between={true}>
        <FormGroup>
          Código de barras
          <InputText type="text" />
        </FormGroup>
        <FormGroup>
          Produto
          <InputText type="text" />
        </FormGroup>
      </StorageDiv>
      <StorageDiv between={true}>
        <FormGroup>
          Preço de compra
          <InputText width="185px" type="text" />
        </FormGroup>
        <FormGroup>
          Preço de venda
          <InputText width="185px" type="text" />
        </FormGroup>
        <FormGroup>
          Quantidade
          <InputText width="185px" type="text" />
        </FormGroup>
      </StorageDiv>
      <GroupButtonFooter>
        <Button type="secondary" onClick={() => console.log("aqui")}>
          Cancelar
        </Button>
        <Button onClick={() => console.log("aqui")}>Salvar</Button>
      </GroupButtonFooter>
    </StorageStyle>
  );
};

export default ProductRegisterForm;
