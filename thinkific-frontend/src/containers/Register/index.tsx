import React, {useEffect} from 'react';
import {omit} from "lodash";
import {
    Form,
    Input,
    Button, notification,
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {registerActions} from "./register.action";
import {rootState} from "../../states/types";


const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function Register() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const register = useSelector<rootState, any>(state => state.register);

    const onFinish = (values: object) => {
        dispatch(registerActions.register(omit(values, 'confirm')));
    };
    useEffect(() => {
        const error = register.get('error');
        if (error && error !== '') {
            notification['error']({
                message: 'Register Error',
                description:
                error,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register.get('error')]);

    return (<Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
    >
        <Form.Item
            name="firstName"
            label="First Name"
            rules={[
                {
                    type: 'string',
                    message: 'The input is not valid string!',
                }
            ]}
        >
            <Input/>
        </Form.Item>
        <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
                {
                    type: 'string',
                    message: 'The input is not valid string!',
                }
            ]}
        >
            <Input/>
        </Form.Item>
        <Form.Item
            name="email"
            label="E-mail"
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
            name="password"
            label="Password"
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                {min: 8, message: 'Password must be minimum 8 characters.'},
            ]}
            hasFeedback
        >
            <Input.Password/>
        </Form.Item>

        <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({getFieldValue}) => ({
                    validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                    },
                }),
            ]}
        >
            <Input.Password/>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={register.get('isLoading')}>
                Register
            </Button>
        </Form.Item>
    </Form>);
}

export default Register;
