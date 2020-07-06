import { put, takeLatest, all } from 'redux-saga/effects'

import Api from '../../@common/Api/Api'
import adminActions from './adminActions'
import { States, Roles } from '../../@common/constants/constants'

function* listClients(){
    const response = yield Api.get('/user', { state: States.ACTIVE, role: Roles.CLIENT })
    if(response.ok){
        yield put(adminActions.listClientsResponse(response.res))
    }else{
        const error = new TypeError(response.res.message)
        yield put(adminActions.listClientsResponse(error))
    }
}

function* actionWatcher(){
    yield takeLatest(adminActions.listClients, listClients)
}

export default function* adminSaga(){
    yield all([actionWatcher()])
}