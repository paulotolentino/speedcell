import React, { useState, useEffect } from "react";
import { useSelector } from "../../Redux/Store";

import Table from "./Components/Table";
import {
  ServiceOrdersStyle,
  ServiceOrdersHeader,
  NewServiceOrderButton,
  InputSearch,
} from "./ServiceOrders_style";
import { Title } from "../Global";

interface ServiceOrdersProps {}

const handleSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const value = event.target.value;
  console.log(value);
};

const ServiceOrdersPage: React.SFC<ServiceOrdersProps> = () => {
  const orders = useSelector((state) => state.ServiceOrdersReducer.data);

  return (
    <ServiceOrdersStyle>
      <Title>Ordens de Serviço</Title>
      <ServiceOrdersHeader>
        <InputSearch type="text" onChange={handleSearch} />
        <NewServiceOrderButton onClick={() => console.log("Nova Os")}>
          Nova Os
        </NewServiceOrderButton>
      </ServiceOrdersHeader>
      {orders.length > 0 ? (
        <Table orders={orders} />
      ) : (
        <span>Nenhum dado disponível</span>
      )}
    </ServiceOrdersStyle>
  );
};

export default ServiceOrdersPage;
