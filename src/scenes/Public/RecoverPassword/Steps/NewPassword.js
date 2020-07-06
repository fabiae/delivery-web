import React from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import authActions from '../../../../services/auth/authActions';

const NewPassword = props => {

    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const { t } = useTranslation()
    const { recover: { userId }} = useSelector(state => state.auth)
    const { newPassword } = authActions

    const onFinish = () => {
        form.validateFields().then((values) => {
            const { password } = values
            dispatch(newPassword(password, userId))
        })
    }

    return (
        <Form
            name='new-password'
            form={form}
            scrollToFirstError
            onFinish={onFinish}>

            <Form.Item
                name='password'
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: t('newPasswordRequired')
                    },
                    () => ({
                        validator(rule, value) {
                            if(!value)
                                    return Promise.resolve()
                            var may = 0;
                            for (var i = 0; i < value.length; i++) {
                                if (value.charCodeAt(i) >= 65 && value.charCodeAt(i) <= 90) {
                                    may++
                                }
                            }
                            if (may >= 2)
                                return Promise.resolve()
                            return Promise.reject(t('passwordMay'))
                        }
                    }),
                    () => ({
                        validator(rule, value) {
                            if(!value)
                                    return Promise.resolve()
                            var num = 0;
                            for (var i = 0; i < value.length; i++) {
                                if (value.charCodeAt(i) >= 48 && value.charCodeAt(i) <= 57) {
                                    num++
                                }
                            }
                            if (num >= 3)
                                return Promise.resolve()
                            return Promise.reject(t('passwordNum'))
                        }
                    })
                ]}>
                <Input.Password prefix={<LockOutlined />} placeholder={t('newPassword')} />
            </Form.Item>
            <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(t('confirmPasswordRule'));
                        },
                    }),
                ]}>
                <Input.Password prefix={<LockOutlined />} placeholder={t('confirmNewPassword')} />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit'>{t('changePassword')}</Button>
            </Form.Item>
        </Form>
    );
};

NewPassword.propTypes = {

};

export default NewPassword;