import * as actionTypes from "../Actions";

export interface ProductInterface {
  id: number;
  nome: string;
  codigo_barras: string;
  preco_compra: number;
  preco_venda: number;
  data_modificacao: Date | null;
  quantidade: number;
}

interface State {
  data: {
    storage: Array<ProductInterface>;
    selectedProduct: ProductInterface;
    isEditing: boolean;
  };
}

export const initialState: State = {
  data: {
    storage: [],
    selectedProduct: {
      codigo_barras: "",
      data_modificacao: null,
      id: 0,
      nome: "",
      preco_compra: 0,
      preco_venda: 0,
      quantidade: 0,
    },
    isEditing: false,
  },
};

const StorageReducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_STORAGE:
      return {
        ...state,
        data: { ...initialState.data, storage: action.data },
      } as State;
    case actionTypes.CLEAN_STORAGE:
      return {
        ...state,
        data: { ...initialState.data },
      } as State;
    case actionTypes.SET_PRODUCT:
      return {
        ...state,
        data: { ...state.data, selectedProduct: action.data, isEditing: true },
      } as State;
    default:
      return state;
  }
};

export default StorageReducer;
