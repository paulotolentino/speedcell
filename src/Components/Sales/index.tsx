import React, { useState, useEffect } from "react";
import { useSelector } from "../../Redux/Store";

import Table from "./Components/Table";
import {
  SalesStyle,
  SalesHeader,
  NewSaleButton,
  InputSearch,
} from "./Sales_style";

interface SalesProps {}

const handleSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const value = event.target.value;
  console.log(value);
};

const SalesPage: React.SFC<SalesProps> = () => {
  const SalesData = useSelector((state) => state.SalesReducer.data);

  return (
    <SalesStyle>
      <SalesHeader>
        <InputSearch type="text" onChange={handleSearch} />
        <NewSaleButton onClick={() => console.log("Nova venda")}>
          Nova venda
        </NewSaleButton>
      </SalesHeader>
      <Table sales={SalesData} />
    </SalesStyle>
  );
};

export default SalesPage;
