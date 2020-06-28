import React, { useState, useEffect } from "react";
import { useSelector } from "../../Redux/Store";

import Table from "./Components/Table";
import {
  ClientsStyle,
  ClientsHeader,
  NewClientButton,
  InputSearch,
} from "./Clients_style";
import { Title } from "../Global";

interface ClientsProps {}

const handleSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const value = event.target.value;
  console.log(value);
};

const ClientsPage: React.SFC<ClientsProps> = () => {
  const clients = useSelector((state) => state.ClientsReducer.data);

  return (
    <ClientsStyle>
      <Title>Clientes</Title>
      <ClientsHeader>
        <InputSearch type="text" onChange={handleSearch} />
        <NewClientButton onClick={() => console.log("Cadastrar cliente")}>
          Cadastrar Cliente
        </NewClientButton>
      </ClientsHeader>
      {clients.length > 0 ? (
        <Table clients={clients} />
      ) : (
        <span>Nenhum dado disponível</span>
      )}
    </ClientsStyle>
  );
};

export default ClientsPage;
