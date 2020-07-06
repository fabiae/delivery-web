const { handleActions } = require("redux-actions");

const initialState = {
    loading: {
        loadingListClients: false
    },
    error: {
        errorListClients: false
    }
}

const adminReducer = handleActions({
    LIST_CLIENTS: (state, action) => {
        return {
            ...state,
            loading: {...state.loading, loadingListClients: true },
            error: {...state.error, errorListClients: false }
        }
    },
    LIST_CLIENTS_RESPONSE: {
        next(state, action){
            const { clients } = action.payload
            return {
                ...state,
                clients,
                loading: {...state.loading, loadingListClients: false },
                error: {...state.error, errorListClients: false }
            }
        },
        throw(state, action){
            const { message } = action.payload
            return {
                ...state,
                loading: {...state.loading, loadingListClients: false },
                error: {...state.error, errorListClients: true, message }
            }
        }
    }
}, initialState)

export default adminReducer