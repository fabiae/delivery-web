import { handleActions } from 'redux-actions'

import token from '../../@common/storage/token'

const initialState = {
    authenticated: token.isTokenValid(),
    loading: {
        loadingSignin: false,
        loadignSignup: false,
        loadingSendCode: false,
        loadingValidateCode: false,
        loadingNewPassword: false
    },
    error: {},
    message : {},
    recover: {
        step: 0
    }
}

const authReducer = handleActions({
    SIGN_UP: (state, action) => {
        return {
            ...state,
            loading: {...state.loading, loadignSignup: true },
            error: {...state.error, errorSignup: false }
        }
    },
    SIGN_UP_RESPONSE: {
        next(state, action){
            return {
                ...state,
                authenticated: true,
                loading: {...state.loading, loadignSignup: false },
                error: {...state.error, errorSignup: false }
            }
        },
        throw(state, action){
            const { message } = action.payload
            return {
                ...state, 
                loading: {...state.loading, loadignSignup: false },
                error: {...state.error, errorSignup: true },
                message: { messageSignUp: message }
            }
        }
    },

    SIGN_IN: (state, action) => {
        return {
            ...state,
            loading: {...state.loading, loadingSignin: true },
            error: {...state.error, errorSignin: false }
        }
    },
    SIGN_IN_RESPONSE: {
        next(state, action){
            return {
                ...state,
                authenticated: true,
                loading: {...state.loading, loadingSignin: false },
                error: {...state.error, errorSignin: false }
            }
        },
        throw(state, action){
            const { message } = action.payload
            return {
                ...state,
                loading: {...state.loading, loadingSignin: false },
                error: {...state.error, errorSignin: true },
                message: { messageSignIn: message }
            }
        }
    },

    LOG_OUT: (state, action) => {
        return {
            ...state,
            authenticated: false
        }
    },

    SEND_CODE: (state, action) => {
        return {
            ...state, 
            loading: {...state.loading, loadingSendCode: true },
            error: {...state.error, errorSendCode: false }
        }
    },
    SEND_CODE_RESPONSE: {
        next(state, action){
            const { response } = action.payload
            const userId = Number.parseInt(response.userId)
            return {
                ...state,
                recover: { step: 1, userId },
                loading: {...state.loading, loadingSendCode: false },
                error: {...state.error, errorSendCode: false },
                message: {...state.message, messageSendCode: response.message }
            }
        },
        throw(state, action){
            const { message } = action.payload
            return {
                ...state,
                loading: {...state.loading, loadingSendCode: false },
                error: {...state.error, errorSendCode: true },
                message: {...state.message, messageSendCode: message }
            }
        }
    },

    VALIDATE_CODE: (state, action) => {
        return {
            ...state,
            loading: {...state.loading, loadingValidateCode: true },
            error: {...state.error, errorValidateCode: false }
        }
    },
    VALIDATE_CODE_RESPONSE:{
        next(state, action){
            const { response } = action.payload
            return {
                ...state,
                recover: {...state.recover, step: 2 },
                loading: {...state.loading, loadingValidateCode: false },
                error: {...state.error, errorValidateCode: false },
                message: {...state.message, messageValidateCode: response.message }
            }
        },
        throw(state, action){
            const { message } = action.payload
            return {
                ...state,
                loading: {...state.loading, loadingValidateCode: false },
                error: {...state.error, errorValidateCode: true },
                message: {...state.message, messageValidateCode: message }
            }
        }
    },
    
    NEW_PASSWORD: (state, action) => {
        return {
            ...state,
            loading: {...state.loading, loadingNewPassword: true },
            error: {...state.error, errorNewPassword: false }
        }
    },
    NEW_PASSWORD_RESPONSE: {
        next(state, action){
            const { response } = action.payload
            return {
                ...state,
                recover: { step: 0 },
                loading: {...state.loading, loadingNewPassword: false },
                error: {...state.error, errorNewPassword: false },
                message: {...state.message, messageNewPassword: response.message }
            }
        },
        throw(state, action){
            const { message } = action.payload
            return {
                ...state,
                loading: {...state.loading, loadingNewPassword: false },
                error: {...state.error, errorNewPassword: true },
                message: {...state.message, messageNewPassword: message }
            }
        }
    },

    RESET_STEPS: (state, action) => {
        return {
            ...state,
            recover: { step: 0 }
        }
    },
    RESET_ERROR: (state, action) => {
        return {
            ...state,
            error: { }
        }
    }

}, initialState)

export default authReducer