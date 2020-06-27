import * as actionTypes from "../Actions";

export interface SaleInterface {
  id: number;
  num_compra: number;
  id_cliente: number;
  data: Date;
  valor: number;
}

interface State {
  data: Array<SaleInterface>;
}

const testData: State = {
  data: [
    {
      id: 1,
      num_compra: 112,
      id_cliente: 3,
      data: new Date(),
      valor: 22.35,
    },
    {
      id: 2,
      num_compra: 113,
      id_cliente: 2,
      data: new Date(),
      valor: 10,
    },
    {
      id: 3,
      num_compra: 114,
      id_cliente: 1,
      data: new Date(),
      valor: 11.99,
    },
    {
      id: 4,
      num_compra: 115,
      id_cliente: 3,
      data: new Date(),
      valor: 80,
    },
    {
      id: 5,
      num_compra: 116,
      id_cliente: 1,
      data: new Date(),
      valor: 50,
    },
  ],
};

export const initialState: State = {
  data: [],
};

const SalesReducer = (state: State = testData, action: any) => {
  switch (action.type) {
    case actionTypes.LOAD_SALES:
      return { ...state, data: action.data } as State;
    default:
      return state;
  }
};

export default SalesReducer;
