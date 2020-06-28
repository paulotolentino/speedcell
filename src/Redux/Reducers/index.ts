import { combineReducers } from "redux";
import ClientsReducer from "./ClientReducer";
import SalesReducer from "./SaleReducer";
import ServiceOrdersReducer from "./ServiceOrderReducer";
import StorageReducer from "./StorageReducer";

const Reducers = combineReducers({
  ClientsReducer,
  SalesReducer,
  ServiceOrdersReducer,
  StorageReducer,
});

export default Reducers;
