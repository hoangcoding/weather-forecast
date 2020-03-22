import React, {FunctionComponent} from "react";

import { Layout } from 'antd';

const { Footer } = Layout;

export const FooterComponent: FunctionComponent = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>Copyright ©2020 | Thinkific Test Application</Footer>)
};
