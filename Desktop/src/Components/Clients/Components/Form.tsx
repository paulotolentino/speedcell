import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "../../../Redux/Store";
import { useDispatch } from "react-redux";
import * as actions from "../../../Redux/Actions";
import axios from "axios";
import moment from "moment";
import { justNumbers } from "../../../Utils/CommonFunctions";
import {
  ComponentStyle,
  ComponentDiv,
  InputText,
  FormGroup,
  Button,
  GroupButtonFooter,
  Title,
} from "../../Global";
import { globalUrl } from "../../../Utils/GlobalURL";

interface ClientRegisterProps {}

const ClientRegisterForm: React.SFC<ClientRegisterProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const clientsReducer = useSelector((state) => state.ClientsReducer.data);
  const cpfSale = useSelector((state) => state.SalesReducer.data.cpfSale);

  const [nome, setNome] = useState<string>("");
  const [cpf, setCPF] = useState<string>("");
  const [cep, setCEP] = useState<string>("");
  const [logradouro, setLogradouro] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [uf, setUF] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dataCriacao, setDataCriacao] = useState<string>("");

  useEffect(() => {
    if (clientsReducer.isEditing) {
      axios
        .get(`${globalUrl}/clientes/${clientsReducer.selectedClientId}`)
        .then(function ({ data }) {
          // handle success
          setNome(data.nome);
          setCPF(data.cpf.toString());
          setCEP(data.cep.toString());
          setLogradouro(data.logradouro);
          setNumero(data.numero);
          setCidade(data.cidade);
          setUF(data.estado);
          setTelefone(data.telefone);
          setEmail(data.email);
          setDataCriacao(data.data_criacao);
          dispatch({
            data: data,
            type: actions.SET_CLIENTS,
          });
        })
        .catch(function (error) {
          // handle error
          alert(error);
          console.log(error);
        });
    } else if (cpfSale > 0) {
      setCPF(cpfSale.toString());
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
        type: actions.SET_CPF_SALE,
      });
    };

    // eslint-disable-next-line
  }, []);

  const searchCEP = (cep: string) => {
    axios
      .get(`http://cep.la/${cep}`, { headers: { Accept: "application/json" } })
      .then((res) => {
        const data = res.data;
        setCidade(data.cidade);
        setUF(data.uf);
        setLogradouro(data.logradouro);
      })
      .catch((err) => console.log(err));
  };

  const handlerChangeState = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
    switch (event.target.id) {
      case "nome":
        setNome(value);
        break;
      case "cpf":
        if (value.length <= 11) setCPF(justNumbers(value));
        break;
      case "cep":
        if (value.length <= 8) setCEP(justNumbers(value));
        if (value.length === 8) searchCEP(value);
        break;
      case "logradouro":
        setLogradouro(value);
        break;
      case "numero":
        setNumero(value);
        break;
      case "cidade":
        setCidade(value);
        break;
      case "uf":
        if (value.length <= 2) setUF(value);
        break;
      case "telefone":
        setTelefone(value);
        break;
      case "email":
      default:
        setEmail(value);
        break;
    }
  };

  const handlerSave = () => {
    if (
      clientsReducer.selectedClient.nome === nome &&
      clientsReducer.selectedClient.cpf.toString() === cpf &&
      clientsReducer.selectedClient.cep.toString() === cep &&
      clientsReducer.selectedClient.logradouro === logradouro &&
      clientsReducer.selectedClient.numero === numero &&
      clientsReducer.selectedClient.cidade === cidade &&
      clientsReducer.selectedClient.estado === uf &&
      clientsReducer.selectedClient.telefone === telefone &&
      clientsReducer.selectedClient.email === email
    ) {
      goBack();
      return;
    }

    const dataToSend = clientsReducer.isEditing
      ? {
          client: {
            nome: nome,
            cpf: cpf,
            cep: cep,
            logradouro: logradouro,
            numero: numero,
            cidade: cidade,
            estado: uf,
            telefone: telefone,
            email: email,
            data_criacao: new Date().toISOString(),
          },
        }
      : {
          newClient: {
            nome: nome,
            cpf: cpf,
            cep: cep,
            logradouro: logradouro,
            numero: numero,
            cidade: cidade,
            estado: uf,
            telefone: telefone,
            email: email,
            data_criacao: new Date().toISOString(),
          },
        };

    if (clientsReducer.isEditing) {
      axios
        .put(
          `${globalUrl}/clientes/${clientsReducer.selectedClient.id}`,
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
        .post(`${globalUrl}/clientes`, dataToSend)
        .then(function (response) {
          // handle success
          if (response.status === 200 && response.data.message === "success") {
            goBack();
          }
        })
        .catch(function (error) {
          // handle error
          alert(
            "Um erro ocorreu. Verifique os dados inseridos.\nAtenção: CPF não pode repetir."
          );
          console.log(error);
        });
    }
  };

  const goBack = () => history.goBack();

  return (
    <ComponentStyle>
      <Title>Clientes</Title>
      <ComponentDiv between={true}>
        <FormGroup>
          <label htmlFor="nome">Nome</label>
          <InputText
            required
            id="nome"
            width="500px"
            type="text"
            value={nome}
            onChange={handlerChangeState}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="cpf">CPF</label>
          <InputText
            required
            id="cpf"
            width="200px"
            type="text"
            placeholder="Somente números"
            value={cpf}
            onChange={clientsReducer.isEditing ? () => {} : handlerChangeState}
          />
        </FormGroup>
      </ComponentDiv>
      <ComponentDiv between={true}>
        <FormGroup>
          <label htmlFor="email">Email</label>
          <InputText
            required
            id="email"
            width="500px"
            type="text"
            value={email}
            onChange={handlerChangeState}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="telefone">Telefone</label>
          <InputText
            required
            id="telefone"
            width="200px"
            type="text"
            value={telefone}
            onChange={handlerChangeState}
          />
        </FormGroup>
      </ComponentDiv>
      <ComponentDiv between={true}>
        <FormGroup>
          <label htmlFor="cep">CEP</label>
          <InputText
            required
            id="cep"
            width="200px"
            type="text"
            placeholder="Somente números"
            value={cep}
            onChange={handlerChangeState}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="logradouro">Logradouro</label>
          <InputText
            required
            id="logradouro"
            width="500px"
            type="text"
            value={logradouro}
            onChange={handlerChangeState}
          />
        </FormGroup>
      </ComponentDiv>
      <ComponentDiv between={true}>
        <FormGroup>
          <label htmlFor="numero">Número</label>
          <InputText
            required
            id="numero"
            width="200px"
            type="text"
            value={numero}
            onChange={handlerChangeState}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="cidade">Cidade</label>
          <InputText
            required
            id="cidade"
            width="200px"
            type="text"
            value={cidade}
            onChange={handlerChangeState}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="uf">Estado</label>
          <InputText
            required
            id="uf"
            width="200px"
            type="text"
            value={uf}
            onChange={handlerChangeState}
          />
        </FormGroup>
      </ComponentDiv>
      <GroupButtonFooter>
        <Button type="secondary" onClick={goBack}>
          Voltar
        </Button>
        {clientsReducer.isEditing &&
          `Cadastrado em: ${moment(dataCriacao).format("DD/MM/YYYY hh:mm")}`}
        <Button onClick={handlerSave}>Salvar</Button>
      </GroupButtonFooter>
    </ComponentStyle>
  );
};

export default ClientRegisterForm;
