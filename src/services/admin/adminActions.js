const { createActions } = require("redux-actions");

const adminActions = createActions({
    LIST_CLIENTS: () => ({}),
    LIST_CLIENTS_RESPONSE: (clients) => ({ clients })
})

export default adminActions