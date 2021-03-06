import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Container, ContainerRender, GlobalStyle } from "./Navigation_style";
import ReactNotification from "react-notifications-component";
import Body from "./Body";
import Navbar from "../Navbar";
import Header from "../Header";

import SalesPage from "../../Sales";
import ServiceOrders from "../../ServiceOrders";
import Storage from "../../Storage";
import Clients from "../../Clients";
import Summary from "../../Summary";

import ProductRegisterForm from "../../Storage/Components/Form";
import ClientRegisterForm from "../../Clients/Components/Form";
import SaleRegisterForm from "../../Sales/Components/Form";
import ServiceOrderRegisterForm from "../../ServiceOrders/Components/Form";

export default function Navigation() {
  return (
    <Router>
      <Route>
        <GlobalStyle />
        <ReactNotification />
        <Body>
          <Navbar />
          <Container>
            <Header />
            <ContainerRender>
              <Switch>
                <Redirect from="/" exact to="Sales" />
                <Route path="/Sales" component={SalesPage} />
                <Route path="/OSs" component={ServiceOrders} />
                <Route path="/Storage" component={Storage} />
                <Route path="/Clients" component={Clients} />
                <Route path="/Summary" component={Summary} />

                {/* Other routes */}
                <Route path="/FormProduct" component={ProductRegisterForm} />
                <Route path="/FormClient" component={ClientRegisterForm} />
                <Route path="/FormSale" component={SaleRegisterForm} />
                <Route path="/FormOs" component={ServiceOrderRegisterForm} />
              </Switch>
            </ContainerRender>
          </Container>
        </Body>
      </Route>
    </Router>
  );
}
