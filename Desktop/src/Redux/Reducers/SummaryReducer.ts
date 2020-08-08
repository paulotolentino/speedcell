import * as actionTypes from "../Actions";
import moment from "moment";
import { getCurrentISODate } from "../../Utils/CommonFunctions";

interface State {
  data: {
    dateIn: string;
    dateOut: string;
  };
}

export const initialState: State = {
  data: {
    dateIn: "",
    dateOut: "",
  },
};

const SummaryReducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_DATE_IN:
      return {
        ...state,
        data: {
          ...state.data,
          dateIn: action.data,
        },
      } as State;
    case actionTypes.SET_DATE_OUT:
      return {
        ...state,
        data: {
          ...state.data,
          dateOut: action.data,
        },
      } as State;
    case actionTypes.SET_INITIAL_PERIOD:
      return {
        ...state,
        data: {
          dateIn: moment(getCurrentISODate(new Date())).format("YYYY-MM-DD"),
          dateOut: moment(getCurrentISODate(new Date())).format("YYYY-MM-DD"),
        },
      };
    default:
      return state;
  }
};

export default SummaryReducer;
