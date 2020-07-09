import React, { useState, useEffect } from "react";
import { useSelector } from "../../Redux/Store";
import { useDispatch } from "react-redux";
import * as actions from "../../Redux/Actions";
import axios from "axios";
import { globalUrl } from "../../Utils/GlobalURL";
import { useHistory } from "react-router-dom";

import Table from "./Components/Table";
import {
  ClientsStyle,
  ClientsHeader,
  Button,
  InputText,
} from "./Clients_style";
import { Title } from "../Global";

interface ClientsProps {}

const handleSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const value = event.target.value;
  console.log(value);
};

const ClientsPage: React.SFC<ClientsProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.ClientsReducer.data.clients);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${globalUrl}/clientes`)
      .then(function (response) {
        // handle success
        setLoading(false);
        return dispatch({
          data: response.data.clients,
          type: actions.SET_CLIENTS,
        });
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        alert(error);
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <ClientsStyle>
      <Title>Clientes</Title>
      <ClientsHeader>
        <InputText type="text" onChange={handleSearch} />
        <Button
          onClick={() =>
            history.push({
              pathname: `/FormClient`,
            })
          }
        >
          Cadastrar Cliente
        </Button>
      </ClientsHeader>
      {clients.length > 0 ? (
        <Table clients={clients} />
      ) : loading ? (
        <span>Carregando</span>
      ) : (
        <span>Nenhum dado disponível</span>
      )}
    </ClientsStyle>
  );
};

export default ClientsPage;
