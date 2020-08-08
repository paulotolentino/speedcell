import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "../../../Redux/Store";
import { useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";
import * as actions from "../../../Redux/Actions";
import { toMoney, getCurrentISODate } from "../../../Utils/CommonFunctions";
import {
  ComponentStyle,
  ComponentDiv,
  InputText,
  FormGroup,
  Button,
  GroupButtonFooter,
  ComponentHeader,
  Deduction,
  HeaderDiv,
} from "../../Global";
import {
  TableDiv,
  Table,
  TableRowHeader,
  TableCellHeader,
  TableCellActionHeader,
  TableRowBody,
  TableCellBody,
  ActionButton,
  GroupActionButton,
} from "../../Global/Table/Table_style";
import { ObjectDiv, TitleSale, ValuesDiv } from "./Form_style";
import { globalUrl } from "../../../Utils/GlobalURL";
import Swal from "sweetalert2";
import { Colors } from "../../Colors";

interface SaleRegisterProps {}

interface ProductProps {
  id: number;
  codigo_barras: string;
  preco_compra: number;
  preco_venda: number;
  nome: string;
  id_estoque: number;
  quantidade: number;
  data_modificacao: Date;
}

const SaleRegisterForm: React.SFC<SaleRegisterProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const inputCodBarras = useRef<HTMLInputElement>(null);
  const salesReducer = useSelector((state) => state.SalesReducer.data);
  const cpfSale = useSelector((state) => state.SalesReducer.data.cpfSale);

  const [idCliente, setIdCliente] = useState<string>("");
  const [nomeCliente, setNomeCliente] = useState<string>("");
  const [cpf, setCPF] = useState<string>("");
  const [cep, setCEP] = useState<string>("");
  const [nVenda, setnVenda] = useState<string>("");
  const [desconto, setDesconto] = useState<number>(0);
  const [codBarras, setCodBarras] = useState<string>("");
  const [data, setData] = useState<Date>();
  const [produtos, setProdutos] = useState<Array<ProductProps>>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (salesReducer.isShowing) {
      axios
        .get(`${globalUrl}/vendas/${salesReducer.idSelectedSale}`)
        .then(function ({ data }) {
          // handle success
          setIdCliente(data.sale.id_cliente);
          setNomeCliente(data.sale.nome);
          setCEP(data.sale.cep.toString());
          setCPF(data.sale.cpf.toString());
          setDesconto(data.sale.valor_desconto);
          setnVenda(data.sale.numero_venda.toString());
          setData(new Date(data.sale.data));
          setProdutos(data.items);
          setTotal(
            data.items.reduce((accum: any, curr: any) => {
              return accum + curr.preco_venda;
            }, 0)
          );
        })
        .catch(function (error) {
          // handle error
          alert(error);
          console.log(error);
        });
    } else {
      axios
        .get(`${globalUrl}/clientes/cpf/${cpfSale > 0 ? cpfSale : "0"}`)
        .then(function ({ data }) {
          // handle success
          setIdCliente(data.id.toString());
          setNomeCliente(data.nome);
          setCEP(data.cep.toString());
          setCPF(cpfSale > 0 ? data.cpf.toString() : "00000000000");
          setProdutos([]);
          // setData(new Date());
          setTotal(0);
        })
        .catch(function (error) {
          // handle error
          alert(error);
          console.log(error);
        });
      axios
        .get(`${globalUrl}/getvendas/numero`)
        .then(function ({ data }) {
          // handle success
          setnVenda((data.count + 1).toString());
        })
        .catch(function (error) {
          // handle error
          alert(error);
          console.log(error);
        });
    }

    return () => {
      dispatch({
        data: false,
        type: actions.SET_SHOW_SALE,
      });
      dispatch({
        data: 0,
        type: actions.SET_CPF_SALE,
      });

      dispatch({
        data: 0,
        type: actions.SET_ID_SALE,
      });
    };
    // eslint-disable-next-line
  }, []);

  const handlerChangeState = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCodBarras(value);
  };

  const hanldeDeduction = async () => {
    const { value } = await Swal.fire({
      icon: "info",
      title: "Insira o valor do desconto",
      text: "Somente números",
      input: "number",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: Colors.Brand.BrandPrimary,
      inputValidator: (value) => {
        if (!value) {
          return "Você deve inserir o desconto ou cancelar.";
        }
        return null;
      },
    });

    if (value) {
      const valDesconto = Number(String(value).replace(",", "."));
      if (valDesconto > total) {
        Swal.fire({
          icon: "error",
          title: "Desconto inválido",
          text: "O desconto deve ser menor do que o valor da venda.",
          confirmButtonText: "OK",
          confirmButtonColor: Colors.Brand.BrandPrimary,
        });
      } else {
        setDesconto(valDesconto);
      }
    }
  };

  const handlerSave = async () => {
    const inputOptions = ["Débito", "Crédito", "Dinheiro"];

    const { value: pay } = await Swal.fire({
      icon: "info",
      title: "Forma de pagamento",
      text: `Selecione a forma de pagamento`,
      input: "radio",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Seguinte",
      cancelButtonText: "Cancelar",
      confirmButtonColor: Colors.Brand.BrandPrimary,
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "Você deve selecionar a forma de pagamento.";
        }
        return null;
      },
    });

    if (pay) {
      const payment = inputOptions[Number(pay)];

      const { value } =
        inputOptions[Number(pay)] === "Dinheiro"
          ? await Swal.fire({
              icon: "info",
              title: "Insira o valor do pagamento",
              text: `Para pagamento, insira o valor total da venda.\n Valor da venda: R$ ${(
                total - desconto
              )
                .toFixed(2)
                .toString()
                .replace(".", ",")}`,
              input: "number",
              showCancelButton: true,
              focusConfirm: false,
              confirmButtonText: "Finalizar",
              cancelButtonText: "Cancelar",
              confirmButtonColor: Colors.Brand.BrandPrimary,
              inputValidator: (value) => {
                if (!value) {
                  return "Você deve inserir o valor do pagamento ou cancelar.";
                }
                return null;
              },
            })
          : { value: total - desconto };

      if (value || value === 0) {
        if (Number(value) < total - desconto) {
          Swal.fire({
            icon: "error",
            title: "Pagamento não realizado.",
            text:
              "O valor do pagamento não pode ser menor do que o valor total.",
            confirmButtonColor: Colors.Brand.BrandPrimary,
          });
          return;
        }

        const dataToSend = {
          sale: {
            numero_venda: Number(nVenda),
            id_cliente: Number(idCliente),
            valor_desconto: Number(desconto),
            data: getCurrentISODate(new Date()),
            forma_pagamento: payment,
          },
          cart: produtos.map((produto) => {
            return {
              id_produto: produto.id,
              preco_dia: produto.preco_venda,
            };
          }),
        };

        if (!salesReducer.isShowing) {
          axios
            .post(`${globalUrl}/vendas`, dataToSend)
            .then((response) => {
              // handle success
              if (
                response.status === 200 &&
                response.data.message === "success"
              ) {
                Swal.fire({
                  icon: "success",
                  title: `Venda realizada.${
                    pay === 3
                      ? ` \n Troco: R$ ${(Number(value) - (total - desconto))
                          .toFixed(2)
                          .toString()
                          .replace(".", ",")}`
                      : ""
                  }`,
                  confirmButtonColor: Colors.Brand.BrandPrimary,
                }).then(() => goBack());
              }
            })
            .catch(function (error) {
              // handle error
              Swal.fire({
                icon: "error",
                title: "Um erro ocorreu.",
                text: "Verifique os dados inseridos.",
                confirmButtonColor: Colors.Brand.BrandPrimary,
              });
              console.log(error);
            });
        }
      }
    }
  };

  const searchProduct = () => {
    axios
      .get(`${globalUrl}/produtos/barcode/${codBarras}`)
      .then(function ({ data }) {
        // handle success
        if (
          Number(data.quantidade) >
          Number(
            produtos.reduce(
              (acc, cur) => (cur.codigo_barras === codBarras ? acc + 1 : acc),
              0
            )
          )
        ) {
          const prods = [...produtos];
          prods.push(data);
          setProdutos(prods);
          setTotal(
            prods.reduce((accum: any, curr: any) => {
              return accum + curr.preco_venda;
            }, 0)
          );
          setCodBarras("");
          inputCodBarras.current?.focus();
        } else {
          Swal.fire({
            icon: "warning",
            title: "Estoque insuficiente",
            text:
              "A quantidade inserida é maior do que a quantidade disponível.",
            confirmButtonColor: Colors.Brand.BrandPrimary,
          });
        }
      })
      .catch(function (error) {
        // handle error
        Swal.fire({
          icon: "error",
          title: "Um erro ocorreu.",
          text: "Verifique os dados inseridos.",
          confirmButtonColor: Colors.Brand.BrandPrimary,
        });
        console.log(error);
      });
  };

  const handlerRemoveProduct = (id: number) => {
    const prods = [...produtos];
    const index = prods.findIndex((p) => p.id === id);
    prods.splice(index, 1);
    setProdutos(prods);
    setTotal(
      prods.reduce((accum: any, curr: any) => {
        return accum + curr.preco_venda;
      }, 0)
    );
  };

  const goBack = () => history.goBack();

  return (
    <ComponentStyle>
      <ObjectDiv>
        <TitleSale>Venda</TitleSale>

        <ValuesDiv>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Valor total:</span> <span>{toMoney(total)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Valor desconto:</span> <span>{toMoney(desconto)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Total com desconto:</span>{" "}
            <span>{toMoney(total - desconto)}</span>
          </div>
        </ValuesDiv>
      </ObjectDiv>
      <ComponentHeader>
        <HeaderDiv>
          <span>CPF: {cpf}</span>
          <span>Cliente: {nomeCliente}</span>
        </HeaderDiv>
        <HeaderDiv>
          <span style={{ fontSize: "20px" }}>N°: {nVenda}</span>
        </HeaderDiv>
        <HeaderDiv>
          <span>CEP: {cep}</span>
          <span>Data: {moment(data).format("DD/MM/YYYY hh:mm")}</span>
        </HeaderDiv>
      </ComponentHeader>
      <FormGroup></FormGroup>
      <FormGroup></FormGroup>
      {!salesReducer.isShowing && (
        <ComponentDiv between={true}>
          <FormGroup>
            <label htmlFor="codBarras">Código de Barras</label>
            <InputText
              required
              autoFocus
              ref={inputCodBarras}
              id="codBarras"
              width="450px"
              type="number"
              placeholder="Somente números"
              value={codBarras}
              onKeyPress={(ev: any) => {
                if (ev.key === "Enter") {
                  searchProduct();
                }
              }}
              onChange={handlerChangeState}
            />
          </FormGroup>
        </ComponentDiv>
      )}
      {produtos.length > 0 && (
        <TableDiv>
          <Table>
            <thead>
              <TableRowHeader>
                <TableCellHeader>Codigo de Barras</TableCellHeader>
                <TableCellHeader>Produto</TableCellHeader>
                <TableCellHeader>Preço venda</TableCellHeader>
                {!salesReducer.isShowing && (
                  <>
                    <TableCellHeader>Quantidade em estoque</TableCellHeader>
                    <TableCellActionHeader>Remover</TableCellActionHeader>
                  </>
                )}
              </TableRowHeader>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <TableRowBody key={produto.id + Math.random()}>
                  <TableCellBody>{produto.codigo_barras}</TableCellBody>
                  <TableCellBody>{produto.nome}</TableCellBody>
                  <TableCellBody>{produto.preco_venda}</TableCellBody>
                  {!salesReducer.isShowing && (
                    <>
                      <TableCellBody>{produto.quantidade}</TableCellBody>
                      <TableCellBody>
                        <GroupActionButton>
                          <ActionButton
                            onClick={() => handlerRemoveProduct(produto.id)}
                            type="primary"
                          >
                            Remover
                          </ActionButton>
                        </GroupActionButton>
                      </TableCellBody>
                    </>
                  )}
                </TableRowBody>
              ))}
            </tbody>
          </Table>
        </TableDiv>
      )}
      <GroupButtonFooter>
        <Button type="secondary" onClick={goBack}>
          Voltar
        </Button>
        {!salesReducer.isShowing && (
          <Deduction
            disabled={produtos.length === 0}
            onClick={produtos.length > 0 ? hanldeDeduction : () => {}}
          >
            Dar desconto
          </Deduction>
        )}
        {!salesReducer.isShowing ? (
          <Button
            disabled={produtos.length === 0}
            onClick={produtos.length > 0 ? handlerSave : () => {}}
          >
            Salvar
          </Button>
        ) : (
          <div />
        )}
      </GroupButtonFooter>
    </ComponentStyle>
  );
};

export default SaleRegisterForm;
