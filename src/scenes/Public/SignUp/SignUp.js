import React from 'react'
import { Form, Input, Button, Spin, Alert, Row, Col } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import authActions from '../../../services/auth/authActions'

const SignUp = props => {

    const dispatch = useDispatch()
    const {
        loading: { loadignSignup },
        error: { errorSignup, message },
    } = useSelector(state => state.auth)

    const [form] = Form.useForm()
    const { t } = useTranslation()
    const { signUp } = authActions

    const onFinish = () => {
        form.validateFields().then((values) => {
            dispatch(signUp(values))
        })
    }

    return (
        <div style={{ padding: '80px 50px', width: '450px', display: 'inline-block' }}>
            <Form
                name='signup'
                form={form}
                scrollToFirstError
                onFinish={onFinish}>
                <Form.Item
                    name='email'
                    rules={[
                        {
                            required: true,
                            message: t('emailRequired')
                        },
                        {
                            type: 'email',
                            message: t('emailType')
                        }
                    ]}>
                    <Input prefix={<MailOutlined />} placeholder={t('email')} />
                </Form.Item>

                <Form.Item
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: t('nameRequired')
                        },
                        {
                            min: 2,
                            message: t('nameMin')
                        },
                        {
                            max: 20,
                            message: t('nameMax')
                        }
                    ]}>
                    <Input prefix={<UserOutlined />} placeholder={t('name')} />
                </Form.Item>

                <Form.Item
                    name='password'
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: t('passwordRule')
                        },
                        () => ({
                            validator(rule, value) {
                                var may = 0;
                                for (var i = 0; i < value.length; i++) {
                                    if (value.charCodeAt(i) >= 65 && value.charCodeAt(i) <= 90) {
                                        may++
                                    }
                                }
                                if (may >= 2)
                                    return Promise.resolve()
                                return Promise.reject('La contraseña debe tener minimo 2 mayusculas')
                            }
                        }),
                        () => ({
                            validator(rule, value) {
                                var num = 0;
                                for (var i = 0; i < value.length; i++) {
                                    if (value.charCodeAt(i) >= 48 && value.charCodeAt(i) <= 57) {
                                        num++
                                    }
                                }
                                if (num >= 3)
                                    return Promise.resolve()
                                return Promise.reject('La contraseña debe tener minimo 3 numeros')
                            }
                        })
                    ]}>
                    <Input.Password prefix={<LockOutlined />} placeholder={t('password')} />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: t('confirmPassword'),
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(t('confirmPasswordRule'));
                            },
                        }),
                    ]}>
                    <Input.Password prefix={<LockOutlined />} placeholder={t('confirmPassword')} />
                </Form.Item>


                <Spin spinning={loadignSignup}>{
                    errorSignup ?
                        <Alert
                            type="error"
                            showIcon
                            closable
                            message={message} /> : null
                }</Spin>

                <Form.Item style={{ padding: '0px 20px' }}>
                    <Button
                        block
                        type='primary'
                        htmlType='submit'>
                        {t('signup')}
                    </Button>
                    {t('or')} <Link to="/signin">{t('signin')}</Link>
                </Form.Item>

            </Form>
        </div>
    )
}

SignUp.propTypes = {

}

export default SignUp