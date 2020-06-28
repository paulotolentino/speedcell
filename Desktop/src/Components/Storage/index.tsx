import React, { useState, useEffect } from "react";
import { useSelector } from "../../Redux/Store";

import Table from "./Components/Table";
import {
  StorageStyle,
  StorageHeader,
  NewProductButton,
  InputSearch,
} from "./Storage_style";
import { Title } from "../Global";

interface StorageProps {}

const handleSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const value = event.target.value;
  console.log(value);
};

const StoragePage: React.SFC<StorageProps> = () => {
  const storage = useSelector((state) => state.StorageReducer.data);

  return (
    <StorageStyle>
      <Title>Estoque</Title>
      <StorageHeader>
        <InputSearch type="text" onChange={handleSearch} />
        <NewProductButton onClick={() => console.log("Cadastrar produto")}>
          Cadastrar Produto
        </NewProductButton>
      </StorageHeader>
      {storage.length > 0 ? (
        <Table storage={storage} />
      ) : (
        <span>Nenhum dado disponível</span>
      )}
    </StorageStyle>
  );
};

export default StoragePage;
