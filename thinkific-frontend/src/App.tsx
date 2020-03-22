import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {Route, Redirect, Switch} from 'react-router-dom';
import Weather from './containers/Weather';

import configureStore, {
    history
} from "./states/configureStore";
import {ConnectedRouter} from "connected-react-router";
import {PrivateRoute} from "./components/PrivateRoute";
import HomePage from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import {Layout} from "./containers/Layout";

const store = configureStore({});

function App() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        // @ts-ignore
                        <PrivateRoute exact path="/weather" component={Weather}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Redirect from="*" to="/"/>
                    </Switch>
                </Layout>
            </ConnectedRouter>
        </Provider>
    );
}

export default App;
