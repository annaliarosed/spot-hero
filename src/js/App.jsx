/* eslint-disable react/jsx-no-bind */
import { hot } from "react-hot-loader/root";
import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import Checkout from "./checkout/Checkout.tsx";
import Confirmation from "./confirmation/Confirmation.tsx";
import Search from "./search/Search.tsx";
import "../sass/main.scss";

const App = ({ spots }) => {
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

App.propTypes = {
    spots: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default hot(App);
