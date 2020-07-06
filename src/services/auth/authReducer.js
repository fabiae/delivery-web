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
    error: {
        errorSignin: false,
        errorSignup: false,
        errorSendCode: false,
        errorValidateCode: false,
        errorNewPassword: false
    },
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
                error: {...state.error, errorSignup: true, message }
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
                error: {...state.error, errorSignin: true, message }
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
                error: {...state.error, errorSendCode: false }
            }
        },
        throw(state, action){
            const { message } = action.payload
            return {
                ...state,
                loading: {...state.loading, loadingSendCode: false },
                error: {...state.error, errorSendCode: true, message }
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
            return {
                ...state,
                recover: {...state.recover, step: 2 },
                loading: {...state.loading, loadingValidateCode: false },
                error: {...state.error, errorValidateCode: false }
            }
        },
        throw(state, action){
            const { message } = action.payload
            return {
                ...state,
                loading: {...state.loading, loadingValidateCode: false },
                error: {...state.error, errorValidateCode: true, message}
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
            return {
                ...state,
                recover: { step: 0 },
                loading: {...state.loading, loadingNewPassword: false },
                error: {...state.error, errorNewPassword: false }
            }
        },
        throw(state, action){
            const { message } = action.payload
            return {
                ...state,
                loading: {...state.loading, loadingNewPassword: false },
                error: {...state.error, errorNewPassword: true, message }
            }
        }
    }
}, initialState)

export default authReducer