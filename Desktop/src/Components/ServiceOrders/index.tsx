import React, { useState, useEffect } from "react";
import { useSelector } from "../../Redux/Store";
import { useDispatch } from "react-redux";
import * as actions from "../../Redux/Actions";
import axios from "axios";
import { globalUrl } from "../../Utils/GlobalURL";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import { ServiceOrderTableInterface } from "../../Redux/Reducers/ServiceOrderReducer";

import Table from "./Components/Table";
import {
  Title,
  ComponentStyle,
  ComponentHeader,
  InputSearch,
  NewSomethingButton as NewServiceOrderButton,
} from "../Global";
import { Colors } from "../Colors";

interface ServiceOrdersProps {}

const ServiceOrdersPage: React.SFC<ServiceOrdersProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const orders = useSelector(
    (state) => state.ServiceOrdersReducer.data.serviceOrders
  );
  const [loading, setLoading] = useState(true);
  const [showedOrders, setShowedOrders] = useState<
    Array<ServiceOrderTableInterface>
  >([]);

  const handleSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const ordersServ = [...orders];

    setShowedOrders(
      ordersServ.filter((order) =>
        Object.values(order).some((paramOrder) => {
          return String(paramOrder)
            .toLocaleLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              value
                .toLocaleLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(",", ".")
            );
        })
      )
    );
  };

  useEffect(() => {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    axios
      .get(`${globalUrl}/os?initialDate=${dateString}&finalDate=${dateString}`)
      .then((response) => {
        setLoading(false);
        setShowedOrders(response.data);
        return dispatch({
          data: response.data,
          type: actions.SET_SERVICE_ORDERS,
        });
      })
      .catch((error) => {
        setLoading(false);
        setShowedOrders([]);
        return dispatch({
          data: [],
          type: actions.SET_SERVICE_ORDERS,
        });
      });
    // eslint-disable-next-line
  }, []);

  const searchValidCPF = (cpf: number) =>
    axios
      .get(`${globalUrl}/clientes/cpf/${cpf}`)
      .then(() => true)
      .catch(() => false);

  const dispatchCPF = async (cpf: number) => {
    dispatch({
      data: cpf,
      type: actions.SET_CPF_SERVICE_ORDERS,
    });
    const isCPFValid = await searchValidCPF(cpf);

    if (isCPFValid) {
      history.push({
        pathname: `/FormOS`,
      });
    } else {
      createClientAsk();
    }
  };

  const createClientAsk = () => {
    Swal.fire({
      title: "CPF não cadastrado",
      text: "Deseja cadastrar este CPF?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.value) {
        history.push({
          pathname: `/FormClient`,
        });
      } else {
        Swal.fire(
          "OS cancelada",
          "OS cancelada pois o CPF não está cadastrado.",
          "info"
        ).then(() => {
          dispatch({
            data: 0,
            type: actions.SET_CPF_SERVICE_ORDERS,
          });
        });
      }
    });
  };

  const insertCPF = async () => {
    const { value: option } = await Swal.fire({
      icon: "info",
      title: "Digite o CPF do cliente",
      text: "Somente números",
      input: "number",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Avançar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: Colors.Brand.BrandPrimary,
      inputValidator: (value) => {
        if (!value) {
          return "Você deve inserir o CPF!";
        }
        return null;
      },
    });

    if (option) {
      dispatchCPF(Number(option));
    }
  };

  return (
    <ComponentStyle>
      <Title>Ordens de Serviço</Title>
      <ComponentHeader>
        <InputSearch type="text" onChange={handleSearch} />
        <NewServiceOrderButton onClick={insertCPF}>
          Nova Os
        </NewServiceOrderButton>
      </ComponentHeader>
      {showedOrders.length > 0 ? (
        <Table orders={showedOrders} />
      ) : loading ? (
        <span>Carregando</span>
      ) : (
        <span>Nenhum dado disponível</span>
      )}
    </ComponentStyle>
  );
};

export default ServiceOrdersPage;
