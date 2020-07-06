import { createActions } from "redux-actions"

const authActions = createActions({
    SIGN_UP: (values) => ({ values }),
    SIGN_UP_RESPONSE: (token) => ({ token }),

    SIGN_IN: (values) => ({ values }),
    SIGN_IN_RESPONSE: (token) => ({ token }),

    LOG_OUT: () => ({}),

    SEND_CODE: (email) => ({ email }),
    SEND_CODE_RESPONSE: (response) => ({ response }),
    VALIDATE_CODE: (code, id) => ({ code, id }),
    VALIDATE_CODE_RESPONSE: (response) => ({response}),
    NEW_PASSWORD: (password, id) => ({ password, id }),
    NEW_PASSWORD_RESPONSE: (response) => ({ response })
})

export default authActions