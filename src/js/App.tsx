/* eslint-disable react/jsx-no-bind */
import { hot } from "react-hot-loader/root";
import React from "react";
import { SpotData } from "./types";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import Checkout from "./checkout/Checkout";
import Confirmation from "./confirmation/Confirmation";
import Search from "./search/Search";
import "../sass/main.scss";

type AppProps = {
  spots: SpotData[];
};

const App = ({ spots }: AppProps) => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return <Search spots={spots} />;
        }}
      />
      <Route path="/checkout/:id" component={Checkout} />
      <Route path="/confirmation/:id" component={Confirmation} />
    </Switch>
  );
};

export default hot(App);
