import React from 'react'
import { Steps } from 'antd'
import { useTranslation } from 'react-i18next'
import { SendOutlined, CheckOutlined, UnlockOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import SendCode from './Steps/SendCode'
import ValidateCode from './Steps/ValidateCode'
import NewPassword from './Steps/NewPassword'
import { useSelector } from 'react-redux'

const { Step } = Steps

const RecoverPassword = props => {

    const { t } = useTranslation()
    const { 
        recover: { step },
        loading: { loadingSendCode, loadingValidateCode, loadingNewPassword },
        error: { errorSendCode, errorValidateCode, errorNewPassword } 
    } = useSelector(state => state.auth)

    return (
        <div style={{ padding: '80px 50px', width: '800px', display: 'inline-block' }}>
            <Steps current={step}>
                <Step 
                    status={errorSendCode ? 'error' : null} 
                    title={t('sendCode')} 
                    icon={
                        errorSendCode ? <CloseCircleOutlined/> : 
                            loadingSendCode ? <LoadingOutlined/> : <SendOutlined />} />
                <Step 
                    status={errorValidateCode ? 'error' : null} 
                    title={t('validateCode')} 
                    icon={
                        errorValidateCode ? <CloseCircleOutlined /> : 
                            loadingValidateCode ? <LoadingOutlined/> : <CheckOutlined /> } />
                <Step 
                    status={errorNewPassword ? 'error' : null} 
                    title={t('newPassword')} 
                    icon={
                        errorNewPassword ? <CloseCircleOutlined/> : 
                            loadingNewPassword ? <LoadingOutlined/> : <UnlockOutlined /> } />
            </Steps>
            <div style={{ margin: '50px 5px', width: '300px', display: 'inline-block' }}>
                { step === 0 && <SendCode /> }
                { step === 1 && <ValidateCode /> }
                { step === 2 && <NewPassword /> }
            </div>
        </div>
    )
}

RecoverPassword.propTypes = {
    
}

export default RecoverPassword