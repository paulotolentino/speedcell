import * as actionTypes from "../Actions";

export interface ServiceOrderInterface {
  id: number;
  num_os: number;
  id_cliente: number;
  data: Date;
  valor: number;
  status: number;
}

interface State {
  data: Array<ServiceOrderInterface>;
}

const testData: State = {
  data: [
    {
      id: 1,
      num_os: 112,
      id_cliente: 3,
      data: new Date(),
      valor: 22.35,
      status: 1,
    },
    {
      id: 2,
      num_os: 113,
      id_cliente: 2,
      data: new Date(),
      valor: 10,
      status: 1,
    },
    {
      id: 3,
      num_os: 114,
      id_cliente: 1,
      data: new Date(),
      valor: 11.99,
      status: 1,
    },
    {
      id: 4,
      num_os: 115,
      id_cliente: 3,
      data: new Date(),
      valor: 80,
      status: 1,
    },
    {
      id: 5,
      num_os: 116,
      id_cliente: 1,
      data: new Date(),
      valor: 50,
      status: 1,
    },
  ],
};

export const initialState: State = {
  data: [],
};

const ServiceOrdersReducer = (state: State = testData, action: any) => {
  switch (action.type) {
    case actionTypes.LOAD_SERVICE_ORDERS:
      return { ...state, data: action.data } as State;
    default:
      return state;
  }
};

export default ServiceOrdersReducer;
