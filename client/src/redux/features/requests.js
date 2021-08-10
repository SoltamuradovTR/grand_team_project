const initialState = {
  loading: false,
  items: [],
  editingRequest: null,
  itemsById: [],
};

const requests = (state = initialState, action) => {
  switch (action.type) {
    case "requests/get/pending":
      return {
        ...state,
        loading: true,
      };
    case "requests/get/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "requests/get/rejected":
      return {
        ...state,
        loading: false,
      };
    case "request/fetch/pending":
      return {
        ...state,
        loading: true,
      };
    case "request/fetch/fulfilled":
      return {
        ...state,
        loading: false,
        itemsById: [action.payload],
      };
    case "request/fetch/rejected":
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default requests;

export const loadAllRequests = () => {
  return async (dispatch) => {
    dispatch({ type: "requests/get/pending" });

    try {
      const response = await fetch("/requests");
      const json = await response.json();

      dispatch({ type: "requests/get/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "requests/get/rejected", error: e.toString() });
    }
  };
};

export const loadRequestById = (id) => {
  return async (dispatch) => {
    dispatch({ type: "request/fetch/pending" });

    try {
      const res = await fetch(`/request/${id}`);
      const json = await res.json();

      dispatch({ type: "request/fetch/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "request/fetch/rejected", error: e.toString() });
    }
  };
};

export const selectAllRequests = (state) => state.requests.items;

export const selectRequestById = (state) => state.requests.itemsById;
