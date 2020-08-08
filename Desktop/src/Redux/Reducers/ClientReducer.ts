import * as actionTypes from "../Actions";

export interface ClientInterface {
  id: number;
  nome: string;
  cpf: number;
  cep: number;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
  telefone: string;
  email: string;
  data_criacao: Date | null;
}
export interface ClientTableInterface {
  id: number;
  nome: string;
  cpf: number;
  telefone: string;
}

interface State {
  data: {
    clients: Array<ClientInterface>;
    selectedClientId: number;
    selectedClient: ClientInterface;
    isEditing: boolean;
  };
}

export const initialState: State = {
  data: {
    clients: [],
    selectedClientId: 0,
    selectedClient: {
      cep: 0,
      cidade: "",
      cpf: 0,
      data_criacao: null,
      email: "",
      estado: "",
      id: 0,
      logradouro: "",
      nome: "",
      numero: "",
      telefone: "",
    },
    isEditing: false,
  },
};

const ClientsReducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_CLIENTS:
      return {
        ...state,
        data: { ...initialState.data, clients: action.data },
      } as State;
    case actionTypes.CLEAN_CLIENTS:
      return {
        ...state,
        data: { ...initialState.data },
      } as State;
    case actionTypes.SET_CLIENT_ID:
      return {
        ...state,
        data: { ...state.data, selectedClientId: action.data, isEditing: true },
      } as State;
    case actionTypes.SET_CLIENT:
      return {
        ...state,
        data: { ...state.data, selectedClient: action.data, isEditing: true },
      } as State;
    default:
      return state;
  }
};

export default ClientsReducer;
