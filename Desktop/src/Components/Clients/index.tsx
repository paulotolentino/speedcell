import React, { useState, useEffect } from "react";
import { useSelector } from "../../Redux/Store";
import { useDispatch } from "react-redux";
import * as actions from "../../Redux/Actions";
import axios from "axios";
import { globalUrl } from "../../Utils/GlobalURL";
import { useHistory } from "react-router-dom";
import { ClientInterface } from "../../Redux/Reducers/ClientReducer";

import Table from "./Components/Table";
import {
  Title,
  ComponentStyle,
  ComponentHeader,
  Button,
  InputText,
} from "../Global";

interface ClientsProps {}

const ClientsPage: React.SFC<ClientsProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.ClientsReducer.data.clients);
  const [loading, setLoading] = useState(true);
  const [showedClients, setShowedClients] = useState<Array<ClientInterface>>(
    []
  );

  useEffect(() => {
    axios
      .get(`${globalUrl}/clientes`)
      .then(function (response) {
        // handle success
        setLoading(false);
        setShowedClients(response.data);
        return dispatch({
          data: response.data,
          type: actions.SET_CLIENTS,
        });
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        setShowedClients([]);
      });
    // eslint-disable-next-line
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const clientes = [...clients];

    setShowedClients(
      clientes.filter((client) =>
        Object.values(client).some((paramClient) => {
          return String(paramClient)
            .toLocaleLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              value
                .toLocaleLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            );
        })
      )
    );
  };

  return (
    <ComponentStyle>
      <Title>Clientes</Title>
      <ComponentHeader>
        <InputText type="text" onChange={handleSearch} />
        <Button
          onClick={() => {
            dispatch({
              data: 0,
              type: actions.SET_CPF_SALE,
            });
            dispatch({
              data: 0,
              type: actions.SET_CPF_SERVICE_ORDERS,
            });
            history.push({
              pathname: `/FormClient`,
            });
          }}
        >
          Cadastrar Cliente
        </Button>
      </ComponentHeader>
      {loading ? (
        <span>Carregando</span>
      ) : showedClients.length > 0 ? (
        <Table clients={showedClients} />
      ) : (
        <span>Nenhum dado disponível</span>
      )}
    </ComponentStyle>
  );
};

export default ClientsPage;
