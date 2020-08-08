import React, { useEffect, useState } from "react";
import { useSelector } from "../../Redux/Store";
import { useDispatch } from "react-redux";
import {
  Title,
  ComponentStyle,
  ComponentHeader,
  NewSomethingButton as SearchPeriodButton,
} from "../Global";
import {
  SummaryPrincipal,
  SummaryItem,
  SummaryTitle,
  SummarySubtitle,
  SummaryCard,
  SummaryValues,
  SummaryRow,
} from "./Summary_style.js";
import InputDate from "./Components/InputDate";
import * as actions from "../../Redux/Actions";
import axios from "axios";
import { globalUrl } from "../../Utils/GlobalURL";
import moment from "moment";
import { getCurrentISODate, toMoney } from "../../Utils/CommonFunctions";

interface SummaryPageProps {}

interface SalesResponse {
  forma_pagamento: string;
  valor_cheio: number;
  valor_desconto: number;
}

interface SosResponse {
  status: string;
  forma_pagamento: string;
  valor_cheio: number;
}

interface SummaryResponse {
  sales?: Array<SalesResponse>;
  sos?: Array<SosResponse>;
}

const SummaryPage: React.SFC<SummaryPageProps> = () => {
  const dispatch = useDispatch();
  const { dateIn, dateOut } = useSelector((state) => state.SummaryReducer.data);
  const [summary, setSummary] = useState<SummaryResponse>();
  const [totalVendas, setTotalVendas] = useState(0);
  const [totalOS, setTotalOS] = useState(0);

  const searchByPeriod = () => {
    console.log(dateIn);
    axios
      .get(`${globalUrl}/resumo?initialDate=${dateIn}&finalDate=${dateOut}`)
      .then((response) => {
        setSummary(response.data);
      })
      .catch((error) => {
        console.log(error);
        setSummary({});
      });
    axios
      .get(
        `${globalUrl}/resumoSomas?initialDate=${dateIn}&finalDate=${dateOut}`
      )
      .then((response) => {
        console.log(response);
        setTotalVendas(
          response.data.sales.valor_cheio - response.data.sales.valor_desconto
        );
        setTotalOS(response.data.sos.valor_cheio);
      })
      .catch((error) => {
        console.log(error);
        setTotalVendas(0);
      });
  };

  useEffect(() => {
    dispatch({
      type: actions.SET_INITIAL_PERIOD,
    });
    axios
      .get(
        `${globalUrl}/resumo?initialDate=${moment(
          getCurrentISODate(new Date())
        ).format("YYYY-MM-DD")}&finalDate=${moment(
          getCurrentISODate(new Date())
        ).format("YYYY-MM-DD")}`
      )
      .then((response) => {
        setSummary(response.data);
      })
      .catch((error) => {
        console.log(error);
        setSummary({});
      });

    axios
      .get(
        `${globalUrl}/resumoSomas?initialDate=${moment(
          getCurrentISODate(new Date())
        ).format("YYYY-MM-DD")}&finalDate=${moment(
          getCurrentISODate(new Date())
        ).format("YYYY-MM-DD")}`
      )
      .then((response) => {
        setTotalVendas(
          response.data.sales.valor_cheio - response.data.sales.valor_desconto
        );
        setTotalOS(response.data.sos.valor_cheio);
      })
      .catch((error) => {
        console.log(error);
        setTotalVendas(0);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <ComponentStyle>
      <Title>Resumo</Title>
      <ComponentHeader>
        <InputDate date={dateIn} action={actions.SET_DATE_IN} />
        <InputDate date={dateOut} action={actions.SET_DATE_OUT} />
        <SearchPeriodButton onClick={searchByPeriod}>Buscar</SearchPeriodButton>
      </ComponentHeader>
      <SummaryPrincipal>
        <SummaryItem>
          <div>
            <SummaryTitle>Vendas</SummaryTitle>
            <SummaryTitle>{toMoney(totalVendas)}</SummaryTitle>
          </div>
          {summary?.sales?.map((s, i) => (
            <SummaryCard key={i}>
              <SummarySubtitle>*{s.forma_pagamento}</SummarySubtitle>
              <SummaryValues>
                <SummaryRow>
                  <span>Valor recebido:</span>
                  <span>{toMoney(s.valor_cheio - s.valor_desconto)}</span>
                </SummaryRow>
              </SummaryValues>
            </SummaryCard>
          ))}
        </SummaryItem>
        <SummaryItem>
          <div>
            <SummaryTitle>Ordens de serviço</SummaryTitle>
            <SummaryTitle>{toMoney(totalOS)}</SummaryTitle>
          </div>
          {summary?.sos?.map((o, i) => (
            <SummaryCard key={i}>
              <SummarySubtitle>*{o.forma_pagamento}</SummarySubtitle>
              <SummaryValues>
                <SummaryRow>
                  <span>Valor recebido:</span>
                  <span>:{toMoney(o.valor_cheio)}</span>
                </SummaryRow>
              </SummaryValues>
            </SummaryCard>
          ))}
        </SummaryItem>
      </SummaryPrincipal>
    </ComponentStyle>
  );
};

export default SummaryPage;
