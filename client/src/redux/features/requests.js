const initialState = {
  loading: false,
  items: [],
  editingRequest: null
}

const requests = (state = initialState, action) => {
  switch (action.type) {
    case "requests/get/pending" :
      return {
        ...state,
        loading: true,
      };
    case "requests/get/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload
      }
    case "requests/get/rejected":
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default requests

export const loadAllRequests = () => {
  return async (dispatch) => {
    dispatch({ type: 'requests/get/pending'});

    try {
      const response = await fetch('/requests');
      const json = await response.json();

      dispatch({ type: "requests/get/fulfilled", payload: json})
    } catch (e) {
      dispatch({ type: "requests/get/rejected", error: e.toString()})
    }
  }
}

export const selectAllRequests = (state) => state.requests.items