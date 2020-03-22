import React, {FunctionComponent, Component} from 'react';
import {Route, Redirect} from 'react-router-dom';

interface PrivateRouteProperties {
    component: Component,
    exact: boolean,
    path: string
}

export const PrivateRoute: FunctionComponent<PrivateRouteProperties> = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        return (
            localStorage.getItem('user')
                // @ts-ignore
                ? <Component {...props}/>
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        )
    }}/>);
