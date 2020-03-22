import React, {FunctionComponent} from "react"
import {FooterComponent} from "../../components/Footer";
import {Layout as AntdLayout} from 'antd';
import {Navbar, NAVBAR_CALLBACK_ENUMS} from "../../components/Navbar";
import {useDispatch, useSelector} from 'react-redux';
import {loginActions} from "../Login/login.action";
import {rootState} from "../../states/types";
import './index.css';

const {Content} = AntdLayout;

type LayoutProps = {
    children: any,
}
export const Layout: FunctionComponent<LayoutProps> = ({children}) => {
    const authentication = useSelector<rootState, any>(state => state.authentication);
    const dispatch = useDispatch();
    const callbackHandler = (type: string, data: any) => {
        switch (type) {
            case NAVBAR_CALLBACK_ENUMS.LOGOUT:
                dispatch(loginActions.logout(authentication.getIn(['user', 'token', 'refreshToken'])));
                break;
            default:
                break;
        }
    };
    return (
        <>
            <AntdLayout>
                <Navbar callbackHandler={callbackHandler}
                        isLoggedIn={authentication.get('loggedIn')}/>
                <Content className="site-layout" style={{
                    background: '#fff',
                    minHeight: "calc(100vh - 133px)",
                    padding: '0 50px',
                    marginTop: 64
                }}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 380}}>
                        {children}
                    </div>
                </Content>
                <FooterComponent/>
            </AntdLayout>
        </>
    )
};
