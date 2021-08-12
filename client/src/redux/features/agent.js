const initialState = {
  signingUp: false,
  signingIn: false,
  error: null,
  editingAgent: null,
  loading: false
};

const agent = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const addClientsToAgent = (clientId, agentId) => {
  return async (dispatch) => {
    dispatch({ type: 'agent/addClient/pending'});

    try {
      await fetch(`/add/client/to/${agentId}`, {
        method: "POST",
        body: JSON.stringify({ client: clientId }),
        headers: {
          "Content-type": "application/json"
        }
      })
      dispatch({ type: 'agent/addClient/fulfilled'})
    } catch (e) {
      dispatch({ type: "agent/addClient/rejected", error: e.toString() })
    }
  }
}

export default agent;

