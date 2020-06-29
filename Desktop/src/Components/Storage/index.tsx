import React, { useState, useEffect } from "react";
import { useSelector } from "../../Redux/Store";
import { useDispatch } from "react-redux";
import * as actions from "../../Redux/Actions";
import axios from "axios";
import { globalUrl } from "../../Utils/GlobalURL";
import { useHistory } from "react-router-dom";

import Table from "./Components/Table";
import {
  StorageStyle,
  StorageHeader,
  Button,
  InputText,
} from "./Storage_style";
import { Title } from "../Global";

interface StorageProps {}

const handleSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const value = event.target.value;
  console.log(value);
};

const StoragePage: React.SFC<StorageProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const storage = useSelector((state) => state.StorageReducer.data);

  useEffect(() => {
    axios
      .get(`${globalUrl}/produtos`)
      .then(function (response) {
        return dispatch({
          data: response.data,
          type: actions.SET_STORAGE,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <StorageStyle>
      <Title>Estoque</Title>
      <StorageHeader>
        <InputText type="text" onChange={handleSearch} />
        <Button
          onClick={() =>
            history.push({
              pathname: `/CreateProduct`,
            })
          }
        >
          Cadastrar Produto
        </Button>
      </StorageHeader>
      {storage.length > 0 ? (
        <Table storage={storage} />
      ) : (
        <span>Nenhum dado disponível</span>
      )}
    </StorageStyle>
  );
};

export default StoragePage;
