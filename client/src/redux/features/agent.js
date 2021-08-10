const initialState = {
  signingUp: false,
  signingIn: false,
  error: null,
  editingAgent: null,
  loading: false
};

const agent = (state = initialState, action) => {
  switch (action.type) {
    case "close/dialog":
      return {
        ...state,
        editingAgent: null,
      };
    case 'set/field':
      const e = action.payload;
      return {
        ...state,
        editingAgent: {
          ...state.editingAgent,
          [e.target.name]: e.target.value
        }
      }
    case "agent/set-editing-agent":
      return {
        ...state,
        editingAgent: action.payload
      }
    case "agent/edit/pending":
      return {
        ...state,
        loading: true,
      };
    case "agent/edit/fulfilled":         //доделать изменение локалсторейдж
      return {
        ...state,
        loading: false,
        editingAgent: null,
        items: state.items.map((school) => {
          if (school._id === state.editingAgent._id) {
            return {
              ...school,
              ...state.editingAgent,
            };
          }
          return school;
        }),
      };
    case "agent/edit/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default agent;

export const closeEditingDialog = () => {
  return {
    type: "close/dialog",
  };
};

export const setFormFields = (e) => {
  return {
    type: "set/field",
    payload: e,
  };
};

export const setEditingAgent = (agent) => {
  return {
    type: "agent/set-editing-agent",
    payload: agent,
  };
};

export const editAgent = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "agent/edit/pending" });

    const { agent  } = getState();

    try {
      await fetch(`/agent/${agent.editingAgent._id}`, {
        method: "PATCH",
        body: JSON.stringify(agent.editingAgent),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      dispatch({ type: "agent/edit/fulfilled" });
    } catch (e) {
      dispatch({ type: "agent/edit/rejected", error: e.toString() });
    }
  };
};

export const selectEditingAgent = (state) => state.agent.editingAgent;
