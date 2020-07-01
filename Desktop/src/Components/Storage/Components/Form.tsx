import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "../../../Redux/Store";
import axios from "axios";
import moment from "moment";
import { justNumbers, numbersAndPeriod } from "../../../Utils/JustNumbers";
import { toMoney } from "../../../Utils/Money";
import {
  StorageStyle,
  StorageDiv,
  InputText,
  FormGroup,
  Button,
  GroupButtonFooter,
} from "../Storage_style";
import { Title } from "../../Global";
import { globalUrl } from "../../../Utils/GlobalURL";

interface ProductRegisterProps {}

const ProductRegisterForm: React.SFC<ProductRegisterProps> = () => {
  const history = useHistory();
  const storageReducer = useSelector((state) => state.StorageReducer.data);

  const [codBarras, setCodBarras] = useState<string>("");
  const [produto, setProduto] = useState<string>("");
  const [precoCompra, setPrecoCompra] = useState<string>("");
  const [precoVenda, setPrecoVenda] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");

  useEffect(() => {
    if (storageReducer.isEditing) {
      setCodBarras(storageReducer.selectedProduct.codigo_barras);
      setProduto(storageReducer.selectedProduct.nome);
      setPrecoCompra(
        numbersAndPeriod(
          toMoney(storageReducer.selectedProduct.preco_compra).toString()
        )
      );
      setPrecoVenda(
        numbersAndPeriod(
          toMoney(storageReducer.selectedProduct.preco_venda).toString()
        )
      );
      setQuantidade(storageReducer.selectedProduct.quantidade.toString());
    }
    // eslint-disable-next-line
  }, []);

  const handlerChangeState = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    switch (event.target.id) {
      case "codBarras":
        setCodBarras(justNumbers(event.target.value));
        break;
      case "produto":
        setProduto(event.target.value);
        break;
      case "precoCompra":
        setPrecoCompra(numbersAndPeriod(event.target.value));
        break;
      case "precoVenda":
        setPrecoVenda(numbersAndPeriod(event.target.value));
        break;
      default:
      case "quantidade":
        setQuantidade(justNumbers(event.target.value));
        break;
    }
  };

  const handlerSave = () => {
    if (
      storageReducer.selectedProduct.codigo_barras === codBarras &&
      storageReducer.selectedProduct.nome === produto &&
      numbersAndPeriod(
        toMoney(storageReducer.selectedProduct.preco_compra).toString()
      ) === precoCompra &&
      numbersAndPeriod(
        toMoney(storageReducer.selectedProduct.preco_venda).toString()
      ) === precoVenda &&
      storageReducer.selectedProduct.quantidade.toString() === quantidade
    ) {
      goBack();
      return;
    }

    const dataToSend = storageReducer.isEditing
      ? {
          product: {
            nome: produto,
            preco_compra: precoCompra,
            preco_venda: precoVenda,
          },
          storage: {
            quantidade: quantidade,
            data_modificacao: new Date().toISOString(),
          },
        }
      : {
          product: {
            codigo_barras: codBarras,
            nome: produto,
            preco_compra: precoCompra,
            preco_venda: precoVenda,
          },
          storage: {
            quantidade: quantidade,
            data_modificacao: new Date().toISOString(),
          },
        };

    if (storageReducer.isEditing) {
      axios
        .put(
          `${globalUrl}/produtos/${storageReducer.selectedProduct.id}`,
          dataToSend
        )
        .then(function (response) {
          // handle success
          if (response.status === 200 && response.data.message === "success") {
            goBack();
          }
        })
        .catch(function (error) {
          // handle error
          alert(error);
          console.log(error);
        });
    } else {
      axios
        .post(`${globalUrl}/produtos`, dataToSend)
        .then(function (response) {
          // handle success
          if (response.status === 200 && response.data.message === "success") {
            goBack();
          }
        })
        .catch(function (error) {
          // handle error
          alert(
            "Um erro ocorreu. Verifique os dados inseridos.\nAtenção: Código de barras não pode repetir."
          );
          console.log(error);
        });
    }
  };

  const goBack = () => history.goBack();

  return (
    <StorageStyle>
      <Title>Estoque</Title>
      <StorageDiv between={true}>
        <FormGroup>
          <label htmlFor="codBarras">Código de barras</label>
          <InputText
            id="codBarras"
            type="text"
            value={codBarras}
            onChange={storageReducer.isEditing ? () => {} : handlerChangeState}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="produto">Produto</label>
          <InputText
            id="produto"
            type="text"
            value={produto}
            onChange={handlerChangeState}
          />
        </FormGroup>
      </StorageDiv>
      <StorageDiv between={true}>
        <FormGroup>
          <label htmlFor="precoCompra">Preço de compra (R$)</label>
          <InputText
            id="precoCompra"
            width="185px"
            type="text"
            value={precoCompra}
            onChange={handlerChangeState}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="precoVenda">Preço de venda (R$)</label>
          <InputText
            id="precoVenda"
            width="185px"
            type="text"
            value={precoVenda}
            onChange={handlerChangeState}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="quantidade">Quantidade</label>
          <InputText
            id="quantidade"
            width="185px"
            type="text"
            value={quantidade}
            onChange={handlerChangeState}
          />
        </FormGroup>
      </StorageDiv>
      <GroupButtonFooter>
        <Button type="secondary" onClick={goBack}>
          Voltar
        </Button>
        {storageReducer.isEditing &&
          `Ultima modificação: ${moment(
            storageReducer.selectedProduct.data_modificacao
          ).format("DD/MM/YYYY hh:mm")}`}
        <Button onClick={handlerSave}>Salvar</Button>
      </GroupButtonFooter>
    </StorageStyle>
  );
};

export default ProductRegisterForm;
