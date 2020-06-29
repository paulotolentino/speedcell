import * as actionTypes from "../Actions";

export interface ClientInterface {
  id: number;
  nome: string;
  cpf: number;
  cep: number;
  logradouro: string;
  numero: string;
  cidade: string;
  uf: string;
  telefone: string;
  email: string;
}

interface State {
  data: Array<ClientInterface>;
}

export const initialState: State = {
  data: [],
};

const ClientsReducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_CLIENTS:
      return { ...state, data: action.data } as State;
    default:
      return state;
  }
};

export default ClientsReducer;
