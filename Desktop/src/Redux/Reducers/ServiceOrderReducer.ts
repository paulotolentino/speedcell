import * as actionTypes from "../Actions";

export interface ServiceOrderTableInterface {
  id: number;
  numero_os: number;
  nome_equipamento: string;
  data_entrada: Date;
  valor: number;
  nome: string;
  forma_pagamento: string;
}
export interface ServiceOrderInterface {
  id: number;
  numero_os: number;
  id_cliente: number;
  nome_equipamento: string;
  marca: string;
  modelo: string;
  numero_serie: string;
  condicoes: string;
  defeitos: string;
  acessorios: string;
  solucao: string;
  laudo_tecnico: string;
  termo_garantia: string;
  observacoes: string;
  data_entrada: Date;
  data_saida: Date;
  valor: number;
  status: string;
  nome: string;
  cpf: number;
  cep: number;
  forma_pagamento: string;
}

interface State {
  data: {
    serviceOrders: Array<ServiceOrderTableInterface>;
    cpfOs: number;
    idSelectedOs: number;
    isShowing: boolean;
  };
}

export const initialState: State = {
  data: {
    serviceOrders: [],
    cpfOs: 0,
    idSelectedOs: 0,
    isShowing: false,
  },
};

const ServiceOrdersReducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_SERVICE_ORDERS:
      return {
        ...state,
        data: {
          ...state.data,
          serviceOrders: action.data,
        },
      } as State;
    case actionTypes.SET_CPF_SERVICE_ORDERS:
      return {
        ...state,
        data: {
          ...state.data,
          cpfOs: action.data,
        },
      } as State;
    case actionTypes.SET_ID_SERVICE_ORDERS:
      return {
        ...state,
        data: {
          ...state.data,
          idSelectedOs: action.data,
        },
      } as State;
    case actionTypes.SET_SHOW_SERVICE_ORDERS:
      return {
        ...state,
        data: {
          ...state.data,
          isShowing: action.data,
        },
      } as State;
    default:
      return state;
  }
};

export default ServiceOrdersReducer;
