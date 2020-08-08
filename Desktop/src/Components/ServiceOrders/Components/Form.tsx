import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "../../../Redux/Store";
import { useDispatch } from "react-redux";
import * as actions from "../../../Redux/Actions";
import axios from "axios";
// import moment from "moment";
import Swal from "sweetalert2";
import { toMoney, getCurrentISODate } from "../../../Utils/CommonFunctions";
import { ComponentStyle, Button, GroupButtonFooter } from "../../Global";
import {
  PrincipalDiv,
  CompanyDiv,
  CompanyLogoAndName,
  CompanyContact,
  CompanyInfosContact,
  BoldSpan,
  NotBoldSpan,
  Logo,
  CompanyInfos,
  CompanyName,
  ServiceOrderNumberAndDate,
  NumberAndDate,
  ClientDataHeader,
  ClientData,
  ClientDataInfo,
  ClientDataRow,
  ClientDataCellTitle,
  ClientDataCellContent,
  SpanBold,
  LabelInputGroup,
  InputOS,
  SignClient,
  PrintableArea,
  TextAreaOS,
} from "./Form_style";
import { globalUrl } from "../../../Utils/GlobalURL";
import SpeedCell from "../../../Assets/logo/marca.png";
import { useReactToPrint } from "react-to-print";
import { Colors } from "../../Colors";

interface ClientRegisterProps {}

const ClientRegisterForm: React.SFC<ClientRegisterProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const osReducer = useSelector((state) => state.ServiceOrdersReducer.data);
  const cpfOs = useSelector((state) => state.ServiceOrdersReducer.data.cpfOs);

  const componentRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const nomeEquipInputRef = useRef<HTMLInputElement>(null);
  const marcaInputRef = useRef<HTMLInputElement>(null);
  const modeloInputRef = useRef<HTMLInputElement>(null);
  const serieInputRef = useRef<HTMLInputElement>(null);

  const [idCliente, setIdCliente] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [cpf, setCPF] = useState<string>("");
  const [cep, setCEP] = useState<string>("");
  const [logradouro, setLogradouro] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [uf, setUF] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // const [osId, setOsId] = useState<string>("");
  const [osNumber, setOsNumber] = useState<string>("");
  const [equipmentName, setEquipmentName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [serialNumber, setSerialNumber] = useState<string>("");
  const [conditions, setConditions] = useState<string>("");
  const [defects, setDefects] = useState<string>("");
  const [accessories, setAccessories] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  const [technicalReport, setTechnicalReport] = useState<string>("");
  const [warrantyTerm, setWarrantyTerm] = useState<string>(
    "Garantia de 30 dias"
  );
  const [observations, setObservations] = useState<string>("");
  // const [incomeDate, setIncomeDate] = useState<string>(
  //   getCurrentISODate(new Date())
  // );
  const [outcomeDate, setOutcomeDate] = useState<string>(
    getCurrentISODate(new Date())
  );
  const [value, setValue] = useState<number>(0);
  const [status, setStatus] = useState<string>("Em andamento");

  useEffect(() => {
    if (osReducer.isShowing) {
      axios
        .get(`${globalUrl}/os/${osReducer.idSelectedOs}`)
        .then(function ({ data }) {
          // handle success
          // setOsId(data.id.toString());
          setIdCliente(data.id_cliente.toString());
          setOsNumber(data.numero_os.toString());
          setEquipmentName(data.nome_equipamento);
          setBrand(data.marca);
          setModel(data.modelo);
          setSerialNumber(data.numero_serie);
          setConditions(data.condicoes);
          setDefects(data.defeitos);
          setAccessories(data.acessorios);
          setSolution(data.solucao);
          setTechnicalReport(data.laudo_tecnico);
          setWarrantyTerm(data.termo_garantia);
          setObservations(data.observacoes);
          // setIncomeDate(getCurrentISODate(new Date(data.data_entrada)));
          setOutcomeDate(getCurrentISODate(new Date(data.data_saida)));
          setValue(data.valor);
          setStatus(data.status);

          axios
            .get(`${globalUrl}/clientes/cpf/${data.cpf}`)
            .then(function ({ data: dataCLI }) {
              // handle success
              setIdCliente(dataCLI.id.toString());
              setNome(dataCLI.nome);
              setCEP(dataCLI.cep.toString());
              setCPF(dataCLI.cpf.toString());
              setLogradouro(dataCLI.logradouro);
              setNumero(dataCLI.numero);
              setCidade(dataCLI.cidade);
              setUF(dataCLI.estado);
              setTelefone(dataCLI.telefone);
              setEmail(dataCLI.email);
            })
            .catch(function (error) {
              // handle error
              alert(error);
              console.log(error);
            });
        })
        .catch(function (error) {
          // handle error
          alert(error);
          console.log(error);
        });
    } else if (cpfOs > 0) {
      setCPF(cpfOs.toString());

      axios
        .get(`${globalUrl}/clientes/cpf/${cpfOs}`)
        .then(function ({ data }) {
          // handle success
          setIdCliente(data.id.toString());
          setNome(data.nome);
          setCEP(data.cep.toString());
          setCPF(data.cpf.toString());
          // setIncomeDate(getCurrentISODate(new Date()));
          setValue(0);
          setLogradouro(data.logradouro);
          setNumero(data.numero);
          setCidade(data.cidade);
          setUF(data.estado);
          setTelefone(data.telefone);
          setEmail(data.email);
        })
        .catch(function (error) {
          // handle error
          alert(error);
          console.log(error);
        });
      axios
        .get(`${globalUrl}/getos/numero`)
        .then(function ({ data }) {
          // handle success
          setOsNumber((data.count + 1).toString());
        })
        .catch(function (error) {
          // handle error
          alert(error);
          console.log(error);
        });
    }

    return () => {
      setNome("");
      setCPF("");
      setCEP("");
      setLogradouro("");
      setNumero("");
      setCidade("");
      setUF("");
      setTelefone("");
      setEmail("");
      dispatch({
        data: 0,
        type: actions.SET_CPF_SERVICE_ORDERS,
      });

      dispatch({
        data: false,
        type: actions.SET_SHOW_SERVICE_ORDERS,
      });

      dispatch({
        data: 0,
        type: actions.SET_ID_SERVICE_ORDERS,
      });
    };

    // eslint-disable-next-line
  }, []);

  const changeServiceValue = () => {
    Swal.fire({
      icon: "info",
      title: "Digite o valor da OS",
      text: "Somente números",
      input: "number",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: Colors.Brand.BrandPrimary,
      inputValidator: (value) => {
        if (!value) {
          return "Você deve inserir o valor!";
        }
        setValue(Number(value));
        return null;
      },
    });
  };

  const changeState = async () => {
    const inputOptions = ["Em andamento", "Finalizado"];

    const { value: status } = await Swal.fire({
      title: "Selecione o status",
      input: "radio",
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "Você precisa escolher um status!";
        }
        return null;
      },
    });

    if (status) {
      setStatus(Number(status) === 0 ? "Em andamento" : "Finalizado");
    }
  };

  const setFocus = (ref: string) => {
    switch (ref) {
      case "nomeEquipInputRef":
        if (nomeEquipInputRef !== null) {
          nomeEquipInputRef.current?.focus();
        }
        break;
      case "marcaInputRef":
        if (marcaInputRef !== null) {
          marcaInputRef.current?.focus();
        }
        break;
      case "modeloInputRef":
        if (modeloInputRef !== null) {
          modeloInputRef.current?.focus();
        }
        break;
      case "serieInputRef":
        if (serieInputRef !== null) {
          serieInputRef.current?.focus();
        }
        break;
    }
  };

  const handlerChangeState = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
    switch (event.target.id) {
      case "equipmentName":
        setEquipmentName(value);
        break;
      case "brand":
        setBrand(value);
        break;
      case "model":
        setModel(value);
        break;
      case "serialNumber":
        setSerialNumber(value);
        break;
      case "conditions":
        setConditions(value);
        break;
      case "defects":
        setDefects(value);
        break;
      case "accessories":
        setAccessories(value);
        break;
      case "solution":
        setSolution(value);
        break;
      case "technicalReport":
        setTechnicalReport(value);
        break;
      case "warrantyTerm":
        setWarrantyTerm(value);
        break;
      case "observations":
        setObservations(value);
        break;
      case "outcomeDate":
        setOutcomeDate(getCurrentISODate(new Date(value)));
        break;
      case "status":
      default:
        setStatus(value);
        break;
    }
  };

  const handlerSave = async () => {
    if (0 === value) {
      console.log("Value cannot be zero");
      Swal.fire({
        icon: "warning",
        title: "O valor da OS não pode ser ZERO",
        confirmButtonColor: Colors.Brand.BrandPrimary,
      });
      return;
    }

    const inputOptions = ["Débito", "Crédito", "Dinheiro"];

    const { value: pay } =
      status !== "Em andamento"
        ? await Swal.fire({
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
          })
        : { value: "3" };

    if (pay || status !== "Em andamento") {
      const payment = pay !== "3" ? inputOptions[Number(pay)] : "Não pago";
      console.log(payment);
      const { value: valor } =
        payment === "Dinheiro"
          ? await Swal.fire({
              icon: "info",
              title: "Insira o valor do pagamento",
              text: `Para pagamento, insira o valor total da venda.\n Valor da venda: R$ ${value
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
          : { value: value };

      if (valor || valor === 0) {
        console.log(valor);
        if (Number(valor) < value) {
          Swal.fire({
            icon: "error",
            title: "Pagamento não realizado.",
            text:
              "O valor do pagamento não pode ser menor do que o valor total.",
            confirmButtonColor: Colors.Brand.BrandPrimary,
          });
          return;
        }

        const dataToSend = osReducer.isShowing
          ? {
              os: {
                status: status,
                forma_pagamento: payment,
              },
            }
          : {
              os: {
                numero_os: osNumber,
                id_cliente: idCliente,
                nome_equipamento: equipmentName,
                marca: brand,
                modelo: model,
                numero_serie: serialNumber,
                condicoes: conditions,
                defeitos: defects,
                acessorios: accessories,
                solucao: solution,
                laudo_tecnico: technicalReport,
                termo_garantia: warrantyTerm,
                observacoes: observations,
                data_entrada: getCurrentISODate(new Date()),
                data_saida: getCurrentISODate(new Date(outcomeDate)),
                valor: valor,
                status: "Em andamento",
                forma_pagamento: payment,
              },
            };
        console.log(dataToSend);

        if (osReducer.isShowing) {
          axios
            .put(`${globalUrl}/os/${osReducer.idSelectedOs}`, dataToSend)
            .then(function (response) {
              // handle success
              if (
                response.status === 200 &&
                response.data.message === "success"
              ) {
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
            .post(`${globalUrl}/os`, dataToSend)
            .then(function (response) {
              // handle success
              if (
                response.status === 200 &&
                response.data.message === "success"
              ) {
                if (handlePrint) {
                  handlePrint();
                }
                goBack();
              }
            })
            .catch(function (error) {
              // handle error
              alert("Um erro ocorreu. Verifique os dados inseridos.");
              console.log(error);
            });
        }
      }
    }
  };

  const goBack = () => history.goBack();

  return (
    <ComponentStyle>
      <div style={{ display: "none" }}>
        <PrintableArea
          ref={componentRef}
          style={{ overflowY: "hidden" }}
          documentTitle={`Ordem de Serviço ${osNumber}`}
        >
          <PrincipalDiv>
            <CompanyDiv>
              <CompanyLogoAndName>
                <Logo src={SpeedCell} alt="Logo" />
                <CompanyInfos>
                  <CompanyName>Nome da Empresa</CompanyName>
                  <span>CNPJ: 60.478.005/0001-56</span>
                  <span>
                    Rua 21 de Abril, 10 (Loja 01) - Brás - São Paulo/SP
                  </span>
                </CompanyInfos>
              </CompanyLogoAndName>
              <CompanyContact>
                <CompanyInfosContact>
                  <BoldSpan>(31) 3333-9999 - (31) 99999-8888</BoldSpan>
                  <BoldSpan>contato@minhaempresa.com.br</BoldSpan>
                  <BoldSpan>
                    <NotBoldSpan>Responsável:</NotBoldSpan> João da Silva
                  </BoldSpan>
                </CompanyInfosContact>
              </CompanyContact>
            </CompanyDiv>
            <ServiceOrderNumberAndDate>
              <NumberAndDate>{status.toLocaleUpperCase()}</NumberAndDate>
              <NumberAndDate>ORDEM DE SERVIÇO Nº {osNumber}</NumberAndDate>
              <NumberAndDate>31/07/2018</NumberAndDate>
            </ServiceOrderNumberAndDate>
            <ClientDataHeader>
              <ClientData>DADOS DO CLIENTE</ClientData>
              <ClientData>VALOR DO SERVIÇO: {toMoney(value)}</ClientData>
            </ClientDataHeader>
            <ClientDataInfo>
              <ClientDataRow>
                <ClientDataCellTitle>
                  <SpanBold>Cliente:</SpanBold>
                </ClientDataCellTitle>
                <ClientDataCellContent>
                  <span>{nome}</span>
                </ClientDataCellContent>
                <ClientDataCellTitle>
                  <SpanBold>CPF:</SpanBold>
                </ClientDataCellTitle>
                <ClientDataCellContent>
                  <span>{cpf}</span>
                </ClientDataCellContent>
              </ClientDataRow>
              <ClientDataRow>
                <ClientDataCellTitle>
                  <SpanBold>Endereço:</SpanBold>
                </ClientDataCellTitle>
                <ClientDataCellContent>
                  <span>
                    {logradouro}, {numero}
                  </span>
                </ClientDataCellContent>
                <ClientDataCellTitle>
                  <SpanBold>CEP:</SpanBold>
                </ClientDataCellTitle>
                <ClientDataCellContent>
                  <span>{cep}</span>
                </ClientDataCellContent>
              </ClientDataRow>
              <ClientDataRow>
                <ClientDataCellTitle>
                  <SpanBold>Cidade:</SpanBold>
                </ClientDataCellTitle>
                <ClientDataCellContent>
                  <span>{cidade}</span>
                </ClientDataCellContent>
                <ClientDataCellTitle>
                  <SpanBold>Estado:</SpanBold>
                </ClientDataCellTitle>
                <ClientDataCellContent>
                  <span>{uf}</span>
                </ClientDataCellContent>
              </ClientDataRow>
              <ClientDataRow>
                <ClientDataCellTitle>
                  <SpanBold>Telefone:</SpanBold>
                </ClientDataCellTitle>
                <ClientDataCellContent>
                  <span>{telefone}</span>
                </ClientDataCellContent>
                <ClientDataCellTitle>
                  <SpanBold>E-mail:</SpanBold>
                </ClientDataCellTitle>
                <ClientDataCellContent>
                  <span>{email}</span>
                </ClientDataCellContent>
              </ClientDataRow>
            </ClientDataInfo>
            <ClientDataHeader>
              <ClientData>EQUIPAMENTO</ClientData>
            </ClientDataHeader>
            <ClientDataInfo>
              <ClientDataRow>
                <LabelInputGroup>
                  <SpanBold>Nome do equipamento</SpanBold>
                  <InputOS readOnly value={equipmentName} />
                </LabelInputGroup>
                <LabelInputGroup>
                  <SpanBold>Marca</SpanBold>
                  <InputOS readOnly value={brand} />
                </LabelInputGroup>
                <LabelInputGroup>
                  <SpanBold>Modelo</SpanBold>
                  <InputOS readOnly value={model} />
                </LabelInputGroup>
                <LabelInputGroup>
                  <SpanBold>Série</SpanBold>
                  <InputOS readOnly value={serialNumber} />
                </LabelInputGroup>
              </ClientDataRow>
              <ClientDataRow>
                <LabelInputGroup>
                  <label>Condiçoes</label>
                  <TextAreaOS rows={4} defaultValue={conditions}></TextAreaOS>
                </LabelInputGroup>
              </ClientDataRow>
              <ClientDataRow>
                <LabelInputGroup>
                  <label>Defeitos</label>
                  <TextAreaOS rows={4} defaultValue={defects}></TextAreaOS>
                </LabelInputGroup>
              </ClientDataRow>
              <ClientDataRow>
                <LabelInputGroup>
                  <label>Acessórios</label>
                  <TextAreaOS rows={4} defaultValue={accessories}></TextAreaOS>
                </LabelInputGroup>
              </ClientDataRow>
              <ClientDataRow>
                <LabelInputGroup>
                  <label>Solução</label>
                  <TextAreaOS rows={4} defaultValue={solution}></TextAreaOS>
                </LabelInputGroup>
              </ClientDataRow>
              <ClientDataRow>
                <LabelInputGroup>
                  <label>Laudo técnico</label>
                  <TextAreaOS
                    rows={4}
                    defaultValue={technicalReport}
                  ></TextAreaOS>
                </LabelInputGroup>
              </ClientDataRow>
              <ClientDataRow>
                <LabelInputGroup>
                  <label>Termos de garantia</label>
                  <TextAreaOS rows={4} defaultValue={warrantyTerm}></TextAreaOS>
                </LabelInputGroup>
              </ClientDataRow>
            </ClientDataInfo>
            <ClientDataHeader>
              <ClientData>OBSERVAÇÔES</ClientData>
            </ClientDataHeader>
            <ClientDataInfo style={{ marginBottom: "0px" }}>
              <ClientDataRow>
                <LabelInputGroup>
                  <TextAreaOS rows={4} defaultValue={observations}></TextAreaOS>
                </LabelInputGroup>
              </ClientDataRow>
            </ClientDataInfo>
            <SignClient>
              <div>
                <p>Entrada: 31/07/2020</p>
                <p>______________________________</p>
                <p>Assinatura do cliente</p>
              </div>
              <div>
                <p>Saída: __/__/____</p>
                <p>______________________________</p>
                <p>Assinatura do técnico</p>
              </div>
            </SignClient>
          </PrincipalDiv>
        </PrintableArea>
      </div>
      <PrintableArea>
        <PrincipalDiv>
          <CompanyDiv>
            <CompanyLogoAndName>
              <Logo src={SpeedCell} alt="Logo" />
              <CompanyInfos>
                <CompanyName>Nome da Empresa</CompanyName>
                <span>CNPJ: 60.478.005/0001-56</span>
                <span>Rua 21 de Abril, 10 (Loja 01) - Brás - São Paulo/SP</span>
              </CompanyInfos>
            </CompanyLogoAndName>
            <CompanyContact>
              <CompanyInfosContact>
                <BoldSpan>(31) 3333-9999 - (31) 99999-8888</BoldSpan>
                <BoldSpan>contato@minhaempresa.com.br</BoldSpan>
                <BoldSpan>
                  <NotBoldSpan>Responsável:</NotBoldSpan> João da Silva
                </BoldSpan>
              </CompanyInfosContact>
            </CompanyContact>
          </CompanyDiv>
          <ServiceOrderNumberAndDate>
            <button onClick={changeState}>
              <NumberAndDate style={{ justifyContent: "flex-start" }}>
                {status.toLocaleUpperCase()}
              </NumberAndDate>
            </button>
            <NumberAndDate>ORDEM DE SERVIÇO Nº {osNumber}</NumberAndDate>
            <NumberAndDate>31/07/2018</NumberAndDate>
          </ServiceOrderNumberAndDate>
          <ClientDataHeader>
            <ClientData>DADOS DO CLIENTE</ClientData>
            <button>
              <ClientData
                onClick={osReducer.isShowing ? () => {} : changeServiceValue}
              >
                VALOR DO SERVIÇO: {toMoney(value)}
              </ClientData>
            </button>
          </ClientDataHeader>
          <ClientDataInfo>
            <ClientDataRow>
              <ClientDataCellTitle>
                <SpanBold>Cliente:</SpanBold>
              </ClientDataCellTitle>
              <ClientDataCellContent>
                <span>{nome}</span>
              </ClientDataCellContent>
              <ClientDataCellTitle>
                <SpanBold>CPF:</SpanBold>
              </ClientDataCellTitle>
              <ClientDataCellContent>
                <span>{cpf}</span>
              </ClientDataCellContent>
            </ClientDataRow>
            <ClientDataRow>
              <ClientDataCellTitle>
                <SpanBold>Endereço:</SpanBold>
              </ClientDataCellTitle>
              <ClientDataCellContent>
                <span>
                  {logradouro}, {numero}
                </span>
              </ClientDataCellContent>
              <ClientDataCellTitle>
                <SpanBold>CEP:</SpanBold>
              </ClientDataCellTitle>
              <ClientDataCellContent>
                <span>{cep}</span>
              </ClientDataCellContent>
            </ClientDataRow>
            <ClientDataRow>
              <ClientDataCellTitle>
                <SpanBold>Cidade:</SpanBold>
              </ClientDataCellTitle>
              <ClientDataCellContent>
                <span>{cidade}</span>
              </ClientDataCellContent>
              <ClientDataCellTitle>
                <SpanBold>Estado:</SpanBold>
              </ClientDataCellTitle>
              <ClientDataCellContent>
                <span>{uf}</span>
              </ClientDataCellContent>
            </ClientDataRow>
            <ClientDataRow>
              <ClientDataCellTitle>
                <SpanBold>Telefone:</SpanBold>
              </ClientDataCellTitle>
              <ClientDataCellContent>
                <span>{telefone}</span>
              </ClientDataCellContent>
              <ClientDataCellTitle>
                <SpanBold>E-mail:</SpanBold>
              </ClientDataCellTitle>
              <ClientDataCellContent>
                <span>{email}</span>
              </ClientDataCellContent>
            </ClientDataRow>
          </ClientDataInfo>
          <ClientDataHeader>
            <ClientData>EQUIPAMENTO</ClientData>
          </ClientDataHeader>
          <ClientDataInfo>
            <ClientDataRow>
              <LabelInputGroup onClick={() => setFocus("nomeEquipInputRef")}>
                <SpanBold>Nome do equipamento</SpanBold>
                <InputOS
                  readOnly={osReducer.isShowing}
                  id="equipmentName"
                  value={equipmentName}
                  onChange={handlerChangeState}
                  ref={nomeEquipInputRef}
                  type="text"
                />
              </LabelInputGroup>
              <LabelInputGroup onClick={() => setFocus("marcaInputRef")}>
                <SpanBold>Marca</SpanBold>
                <InputOS
                  readOnly={osReducer.isShowing}
                  id="brand"
                  value={brand}
                  onChange={handlerChangeState}
                  ref={marcaInputRef}
                  type="text"
                />
              </LabelInputGroup>
              <LabelInputGroup onClick={() => setFocus("modeloInputRef")}>
                <SpanBold>Modelo</SpanBold>
                <InputOS
                  readOnly={osReducer.isShowing}
                  id="model"
                  value={model}
                  onChange={handlerChangeState}
                  ref={modeloInputRef}
                  type="text"
                />
              </LabelInputGroup>
              <LabelInputGroup onClick={() => setFocus("serieInputRef")}>
                <SpanBold>Série</SpanBold>
                <InputOS
                  readOnly={osReducer.isShowing}
                  id="serialNumber"
                  value={serialNumber}
                  onChange={handlerChangeState}
                  ref={serieInputRef}
                  type="text"
                />
              </LabelInputGroup>
            </ClientDataRow>
            <ClientDataRow>
              <LabelInputGroup>
                <label>Condiçoes</label>
                <TextAreaOS
                  readOnly={osReducer.isShowing}
                  id="conditions"
                  value={conditions}
                  onChange={handlerChangeState}
                  rows={4}
                ></TextAreaOS>
              </LabelInputGroup>
            </ClientDataRow>
            <ClientDataRow>
              <LabelInputGroup>
                <label>Defeitos</label>
                <TextAreaOS
                  readOnly={osReducer.isShowing}
                  id="defects"
                  value={defects}
                  onChange={handlerChangeState}
                  rows={4}
                ></TextAreaOS>
              </LabelInputGroup>
            </ClientDataRow>
            <ClientDataRow>
              <LabelInputGroup>
                <label>Acessórios</label>
                <TextAreaOS
                  readOnly={osReducer.isShowing}
                  id="accessories"
                  value={accessories}
                  onChange={handlerChangeState}
                  rows={4}
                ></TextAreaOS>
              </LabelInputGroup>
            </ClientDataRow>
            <ClientDataRow>
              <LabelInputGroup>
                <label>Solução</label>
                <TextAreaOS
                  readOnly={osReducer.isShowing}
                  id="solution"
                  value={solution}
                  onChange={handlerChangeState}
                  rows={4}
                ></TextAreaOS>
              </LabelInputGroup>
            </ClientDataRow>
            <ClientDataRow>
              <LabelInputGroup>
                <label>Laudo técnico</label>
                <TextAreaOS
                  readOnly={osReducer.isShowing}
                  id="technicalReport"
                  value={technicalReport}
                  onChange={handlerChangeState}
                  rows={4}
                ></TextAreaOS>
              </LabelInputGroup>
            </ClientDataRow>
            <ClientDataRow>
              <LabelInputGroup>
                <label>Termos de garantia</label>
                <TextAreaOS
                  readOnly={osReducer.isShowing}
                  id="warrantyTerm"
                  value={warrantyTerm}
                  onChange={handlerChangeState}
                  rows={4}
                ></TextAreaOS>
              </LabelInputGroup>
            </ClientDataRow>
          </ClientDataInfo>
          <ClientDataHeader>
            <ClientData>OBSERVAÇÔES</ClientData>
          </ClientDataHeader>
          <ClientDataInfo>
            <ClientDataRow>
              <LabelInputGroup>
                <TextAreaOS
                  id="observations"
                  readOnly={osReducer.isShowing}
                  value={observations}
                  onChange={handlerChangeState}
                  rows={4}
                ></TextAreaOS>
              </LabelInputGroup>
            </ClientDataRow>
          </ClientDataInfo>
        </PrincipalDiv>
      </PrintableArea>
      <GroupButtonFooter>
        <Button type="secondary" onClick={goBack}>
          Voltar
        </Button>
        <Button type="info" onClick={handlePrint}>
          Imprimir
        </Button>
        <Button onClick={handlerSave}>Salvar</Button>
      </GroupButtonFooter>
    </ComponentStyle>
  );
};

export default ClientRegisterForm;
