import React, { useState, useEffect } from "react";
import { useSelector } from "../../Redux/Store";
import { useDispatch } from "react-redux";
import * as actions from "../../Redux/Actions";
import axios from "axios";
import { globalUrl } from "../../Utils/GlobalURL";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import Table from "./Components/Table";
import {
  SalesStyle,
  SalesHeader,
  NewSaleButton,
  InputSearch,
} from "./Sales_style";
import { Title } from "../Global";
import { Colors } from "../Colors";

interface SalesProps {}

const handleSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const value = event.target.value;
  console.log(value);
};

const SalesPage: React.SFC<SalesProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const reducer = useSelector((state) => state.SalesReducer.data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    console.log(dateString);
    axios
      .get(
        `${globalUrl}/vendas?initialDate=${dateString}&finalDate=${dateString}`
      )
      .then((response) => {
        setLoading(false);
        return dispatch({
          data: response.data,
          type: actions.SET_SALES,
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
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
      type: actions.SET_CPF_SALE,
    });
    if (cpf !== -1) {
      const isCPFValid = await searchValidCPF(cpf);

      if (isCPFValid) {
        history.push({
          pathname: `/FormSale`,
        });
      } else {
        createClientAsk();
      }
    } else {
      history.push({
        pathname: `/FormSale`,
      });
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
          "Venda cancelada",
          "Venda cancelada pois o CPF não está cadastrado.",
          "info"
        ).then(() => {
          dispatch({
            data: 0,
            type: actions.SET_CPF_SALE,
          });
        });
      }
    });
  };

  const wantCPF = async () => {
    const inputOptions = ["Sim", "Não"];

    const { value: option } = await Swal.fire({
      icon: "question",
      title: "Deseja colocar o CPF do cliente?",
      text: "Caso não deseje colocar CPF, será inserido o CPF 000.000.000-00",
      input: "radio",
      inputOptions: inputOptions,
      inputValidator: (value): string | null => {
        if (!value) {
          return "Você deve escolher uma opção!";
        }
        return null;
      },
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Avançar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: Colors.Brand.BrandPrimary,
    });

    if (option) {
      if (option === "0") {
        Swal.fire({
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
            dispatchCPF(Number(value));
            return null;
          },
        });
      } else {
        dispatchCPF(-1);
      }
    }
  };

  return (
    <SalesStyle>
      <Title>Vendas</Title>
      <SalesHeader>
        <InputSearch type="text" onChange={handleSearch} />
        <NewSaleButton onClick={wantCPF}>Nova venda</NewSaleButton>
      </SalesHeader>
      {reducer.sales.length > 0 ? (
        <Table sales={reducer.sales} />
      ) : loading ? (
        <span>Carregando</span>
      ) : (
        <span>Nenhum dado disponível</span>
      )}
    </SalesStyle>
  );
};

export default SalesPage;
