import React, { useState, useEffect } from "react";
import { useSelector } from "../../Redux/Store";
import { useDispatch } from "react-redux";
import * as actions from "../../Redux/Actions";
import axios from "axios";
import { globalUrl } from "../../Utils/GlobalURL";
import { useHistory } from "react-router-dom";

import Table from "./Components/Table";
import {
  Title,
  ComponentStyle,
  ComponentHeader,
  Button,
  InputText,
} from "../Global";

import { ProductInterface } from "../../Redux/Reducers/StorageReducer";

interface StorageProps {}

const StoragePage: React.SFC<StorageProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const storage = useSelector((state) => state.StorageReducer.data.storage);
  const [loading, setLoading] = useState(true);
  const [showedProds, setShowedProds] = useState<Array<ProductInterface>>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const prods = storage;

    setShowedProds(
      prods.filter((prod) =>
        Object.values(prod).some((paramProd) => {
          return String(paramProd)
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
    axios
      .get(`${globalUrl}/produtos`)
      .then(function (response) {
        // handle success
        setLoading(false);
        setShowedProds(response.data);
        return dispatch({
          data: response.data,
          type: actions.SET_STORAGE,
        });
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        setShowedProds([]);
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <ComponentStyle>
      <Title>Estoque</Title>
      <ComponentHeader>
        <InputText type="text" onChange={handleSearch} />
        <Button
          onClick={() =>
            history.push({
              pathname: `/FormProduct`,
            })
          }
        >
          Cadastrar Produto
        </Button>
      </ComponentHeader>
      {showedProds.length > 0 ? (
        <Table storage={showedProds} />
      ) : loading ? (
        <span>Carregando</span>
      ) : (
        <span>Nenhum dado disponível</span>
      )}
    </ComponentStyle>
  );
};

export default StoragePage;
