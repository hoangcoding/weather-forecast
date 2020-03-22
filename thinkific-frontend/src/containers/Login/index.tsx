import React, {useEffect} from 'react';
import {Form, Input, Button, notification} from "antd";
import {loginActions} from "./login.action";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../../states/types";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 0},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 10},
};

function Login(props: any) {
    const dispatch = useDispatch();
    const authentication = useSelector<rootState, any>(state => state.authentication);
    const onFinish = (values: any) => {
        dispatch(loginActions.login(values));
    };

    useEffect(() => {
        dispatch(loginActions.clearError());
    }, []);

    useEffect(() => {
        if (authentication && authentication.get('loggedIn')) {
            props.history.push('/weather');
        }
    });

    useEffect(() => {
        const error = authentication.get('error');
        if (error && error !== '') {
            notification['error']({
                message: 'Login Error',
                description:
                error,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authentication.get('error')]);

    return (<Form
        {...layout}
        name="basic"
        initialValues={{remember: true}}
        onFinish={onFinish}
    >
        <Form.Item
            label="E-mail"
            name="email"
            rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
            ]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[
                {required: true, message: 'Please input your password!'},
                {min: 8, message: 'Password must be minimum 8 characters.'},
            ]}
        >
            <Input.Password/>
        </Form.Item>

        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={authentication.get('isLoading')}>
                Login
            </Button>
        </Form.Item>
    </Form>);
}

export default Login;
