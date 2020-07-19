import * as actionTypes from "../Actions";
export interface ProductProps {
  id: number;
  numero_venda: number;
  id_cliente: number;
  valor_desconto: number;
  data: Date;
  nome: string;
  cpf: number;
  preco_venda: number;
  cep: number;
  valor: number;
}

interface State {
  data: {
    sales: Array<ProductProps>;
    idSelectedSale: number;
    cpfSale: number;
    isShowing: boolean;
  };
}

export const initialState: State = {
  data: {
    sales: [],
    idSelectedSale: 0,
    cpfSale: 0,
    isShowing: false,
  },
};

const SalesReducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_SALES:
      return {
        ...state,
        data: {
          ...state.data,
          sales: action.data,
        },
      } as State;
    case actionTypes.SET_CPF_SALE:
      return {
        ...state,
        data: {
          ...state.data,
          cpfSale: action.data,
        },
      } as State;
    case actionTypes.SET_ID_SALE:
      return {
        ...state,
        data: {
          ...state.data,
          idSelectedSale: action.data,
        },
      } as State;
    case actionTypes.SET_SHOW_SALE:
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

export default SalesReducer;
