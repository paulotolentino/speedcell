import { createStore } from "redux";
import Reducers from "../Reducers";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";

const store = createStore(Reducers);

export type RootState = ReturnType<typeof Reducers>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default store;
