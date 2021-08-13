const initialState = {
  error: null,
  loading: false,
  itemsById: []
};

const agent = (state = initialState, action) => {
  switch (action.type) {
    case 'agent/getById/pending':
      return {
        ...state,
        loading: true
      };
    case 'agent/getById/fulfilled':
      return {
        ...state,
        loading: false,
        itemsById: [action.payload]
      };
    case 'agent/getById/rejected':
      return {
        ...state,
        loading: false
      }
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

export const loadAgentById = (agentId) => {
  return async (dispatch) => {
    dispatch({ type: 'agent/getById/pending'})

    try {
      const res = await fetch(`/agent/${agentId}`)
      const json = await res.json();

      dispatch({ type: 'agent/getById/fulfilled', payload: json})
    } catch (e) {
      dispatch({ type: 'agent/getById/rejected', error: e.toString()})
    }
  }
}

export default agent;

export const selectAgentById = (state) => state.agent.itemsById