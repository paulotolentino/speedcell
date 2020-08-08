import { combineReducers } from "redux";
import ClientsReducer from "./ClientReducer";
import SalesReducer from "./SaleReducer";
import ServiceOrdersReducer from "./ServiceOrderReducer";
import StorageReducer from "./StorageReducer";
import SummaryReducer from "./SummaryReducer";

const Reducers = combineReducers({
  ClientsReducer,
  SalesReducer,
  ServiceOrdersReducer,
  StorageReducer,
  SummaryReducer,
});

export default Reducers;
