import React from 'react';
import { Form, InputNumber, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import authActions from '../../../../services/auth/authActions';

const ValidateCode = props => {

    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const { t } = useTranslation()
    const { recover: { userId } } = useSelector(state => state.auth)
    const { validateCode } = authActions

    const onFinish = () => {
        form.validateFields().then((values) => {
            const { code } = values
            dispatch(validateCode( code, userId ))
        })
    }

    return (
        <Form
            name='validate-code'
            form={form}
            scrollToFirstError
            onFinish={onFinish}>
                
            <Form.Item
                name='code'
                rules={[
                    {
                        required: true,
                        message: t('codeRequired')
                    },
                ]}>
                <InputNumber placeholder={t('code')} maxLength={6} />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit'>{t('validateCode')}</Button>
            </Form.Item>
        </Form>
    );
};

ValidateCode.propTypes = {
    
};

export default ValidateCode;