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

interface State {
  data: {
    clients: Array<ClientInterface>;
    selectedClient: ClientInterface;
    isEditing: boolean;
  };
}

export const initialState: State = {
  data: {
    clients: [],
    selectedClient: {
      id: 0,
      nome: "",
      cpf: 0,
      email: "",
      telefone: "",
      cep: 0,
      logradouro: "",
      numero: "",
      cidade: "",
      estado: "",
      data_criacao: null,
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
