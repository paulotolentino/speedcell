import React, { useState, useEffect } from "react";
import { useSelector } from "../../Redux/Store";

import Table from "./Components/Table";
import {
  SalesStyle,
  SalesHeader,
  NewSaleButton,
  InputSearch,
} from "./Sales_style";
import { Title } from "../Global";

interface SalesProps {}

const handleSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const value = event.target.value;
  console.log(value);
};

const SalesPage: React.SFC<SalesProps> = () => {
  const sales = useSelector((state) => state.SalesReducer.data);

  return (
    <SalesStyle>
      <Title>Vendas</Title>
      <SalesHeader>
        <InputSearch type="text" onChange={handleSearch} />
        <NewSaleButton onClick={() => console.log("Nova venda")}>
          Nova venda
        </NewSaleButton>
      </SalesHeader>
      {sales.length > 0 ? (
        <Table sales={sales} />
      ) : (
        <span>Nenhum dado disponível</span>
      )}
    </SalesStyle>
  );
};

export default SalesPage;
