import React from "react";
import { InputDate } from "./InputDate_style";
import { useDispatch } from "react-redux";

interface InputDateComponentProps {
  action: string;
  date: string;
}

const InputDateComponent: React.SFC<InputDateComponentProps> = ({
  date,
  action,
}) => {
  const dispatch = useDispatch();
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return dispatch({
      data: e.target.value,
      type: action,
    });
  };

  return <InputDate type="date" onChange={handlerChange} value={date} />;
};

export default InputDateComponent;
