import { combineReducers } from "redux";
import ClientsReducer from "./ClientReducer";
import SalesReducer from "./SaleReducer";

const Reducers = combineReducers({
  ClientsReducer,
  SalesReducer,
});

export default Reducers;
