import { connectRouter } from "connected-react-router"
import { combineReducers } from "redux"

import authReducer from "../services/auth/authReducer"
import utilitiesReducer from '../services/utilities/utilitiesReducer'
import adminReducer from "../services/admin/adminReducer"

const rootReducers = (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    utilities: utilitiesReducer,
    admin: adminReducer
})

export default rootReducers
