import { put, all, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import authActions from './authActions'
import Api from '../../@common/Api/Api'
import token from '../../@common/storage/token'

function* signUp(data){
    const { values } = data.payload
    const response = yield Api.post('/auth/signup', values)
    if(response.ok){
        token.setToken(response.res.token)
        yield put (authActions.signUpResponse())
        yield put(push('/'))
    }else{
        const error = new TypeError(response.res.message)
        yield put(authActions.signUpResponse(error))
    }
}

function* signIn(data){
    const { values } = data.payload
    const response = yield Api.post("/auth/signin", values)
    if(response.ok){
        token.setToken(response.res.token)
        yield put (authActions.signInResponse())
        yield put(push('/'))
    }else{
        const error = new TypeError(response.res.message)
        yield put(authActions.signInResponse(error))
    }
}

function* logOut(){
    token.removeToken()
}

function* sendCode(data){
    const { email } = data.payload
    const response = yield Api.get('/auth/send-code', email )
    if(response.ok){
        yield put(authActions.sendCodeResponse(response.res))
    }else{
        const error = new TypeError(response.res.message)
        yield put(authActions.sendCodeResponse(error))
    }
}

function* validateCode(data){
    const { payload } = data
    const response = yield Api.post('/auth/validate-code', payload )
    if(response.ok){
        yield put(authActions.validateCodeResponse(response.res))
    }else{
        const error = new TypeError(response.res.message)
        yield put(authActions.validateCodeResponse(error))
    }
}

function* newPassword(data){
    const { payload } = data
    const response = yield Api.post('/auth/recover-password', payload)
    if(response.ok){
        yield put(authActions.newPasswordResponse(response.res))
        yield put(push('/signin'))
    }else{
        const error = new TypeError(response.res.message)
        yield put(authActions.newPasswordResponse(error))
    }
}

function* actionWatcher(){
    yield takeLatest(authActions.signUp, signUp)
    yield takeLatest(authActions.signIn, signIn)
    yield takeLatest(authActions.logOut, logOut)
    
    yield takeLatest(authActions.sendCode, sendCode)
    yield takeLatest(authActions.validateCode, validateCode)
    yield takeLatest(authActions.newPassword, newPassword)
}

export default function* authSaga(){
    yield all([actionWatcher()])
}