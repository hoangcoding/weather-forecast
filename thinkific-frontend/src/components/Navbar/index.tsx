import React, {FunctionComponent} from "react";
import {Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';

const {Header} = Layout;
const VIEW_CALLBACK_ENUMS = {
    LOGOUT: 'LOGOUT'
};

type HeaderProps = {
    callbackHandler: any,
    isLoggedIn: boolean,
}

export const Navbar: FunctionComponent<HeaderProps> = (props) => {
    const handleLogout = () => {
        props.callbackHandler(VIEW_CALLBACK_ENUMS.LOGOUT, {});
    };

    const authLinks = (
        <Menu
            theme="dark"
            mode="horizontal"
            selectable={false}
            style={{lineHeight: '64px'}}
        >
            <Menu.Item><Link to="/">Home</Link></Menu.Item>
            <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
        </Menu>
    );
    const guestLinks = (
        <Menu
            theme="dark"
            mode="horizontal"
            selectable={false}
            style={{lineHeight: '64px'}}
        >
            <Menu.Item><Link to="/login">Login</Link></Menu.Item>
            <Menu.Item><Link to="/register">Register</Link></Menu.Item>
        </Menu>
    );
    return (
        <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
            {(props.isLoggedIn) ? authLinks : guestLinks}
        </Header>
    )
};
export {
    VIEW_CALLBACK_ENUMS as NAVBAR_CALLBACK_ENUMS,
};

