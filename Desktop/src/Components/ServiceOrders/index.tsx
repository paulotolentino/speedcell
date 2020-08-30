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
  const { date } = useSelector((state) => state.ServiceOrdersReducer);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [showedOrders, setShowedOrders] = useState<
    Array<ServiceOrderTableInterface>
  >([]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    axios
      .get(`${globalUrl}/buscaos?number=${searchValue}`)
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
  };

  useEffect(() => {
    axios
      .get(`${globalUrl}/os?initialDate=${date}&finalDate=${date}`)
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
  }, [date]);

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
        <InputSearch type="text" onChange={handleChange} />
        {/* <InputDate date={date} action={actions.SET_DATE_OS} /> */}
        <NewServiceOrderButton onClick={handleSearch}>
          Buscar
        </NewServiceOrderButton>
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
