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
                <Route path="/OSs" component={() => <div>OSs</div>} />
                <Route path="/Storage" component={() => <div>Storage</div>} />
                <Route path="/Clients" component={() => <div>Clients</div>} />
                <Route path="/Summary" component={() => <div>Summary</div>} />
              </Switch>
            </ContainerRender>
          </Container>
        </Body>
      </Route>
    </Router>
  );
}
