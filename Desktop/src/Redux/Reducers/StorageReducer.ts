import * as actionTypes from "../Actions";

export interface ProductInterface {
  id: number;
  nome: string;
  codigo_barras: string;
  preco_compra: number;
  preco_venda: number;
  data_modificacao: Date;
}

interface State {
  data: Array<ProductInterface>;
}

export const initialState: State = {
  data: [],
};

const StorageReducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_STORAGE:
      return { ...state, data: action.data } as State;
    default:
      return state;
  }
};

export default StorageReducer;
