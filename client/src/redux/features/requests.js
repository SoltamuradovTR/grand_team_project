const initialState = {
  loading: false,
  items: [],
  editingRequest: null,
  addition: false,
  deleting: false,
  itemsById: [],
  filterText: "",
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
    case "request/search":
      return {
        ...state,
        filterText: action.payload,
      };
    case "request/add/pending":
      return {
        ...state,
        addition: true,
      };
    case "request/add/fulfilled":
      return {
        ...state,
        addition: false,
        items: [action.payload, ...state.items],
      };
    case "request/add/rejected":
      return {
        ...state,
        addition: false,
      };
    case "request/delete/pending": {
      return {
        ...state,
        deleting: true,
      };
    }
    case "request/delete/fulfilled":
      return {
        ...state,
        items: state.items.filter((request) => {
          return request._id !== action.payload;
        }),
        deleting: false,
      };
    case "request/delete/rejected":
      return {
        ...state,
        deleting: false,
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

export const addAppraiser = (request, agent) => {
  return async (dispatch) => {
    dispatch({ type: "request/addAppraiser/pending" });

    try {
      const res = await fetch(`/appraisers/${request}`, {
        method: "POST",
        body: JSON.stringify({ request: agent }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const json = res.json();
      dispatch({ type: "request/addAppraiser/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "request/addAppraiser/rejected", error: e.toString() });
    }
  };
};

export const searchRequest = (data) => {
  return { type: "request/search", payload: data };
};

export const addRequest = (data, id) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "request/add/pending" });
    try {
      const res = await fetch(`/client/${id}/request`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.login.token}`,
        },
      });
      const json = await res.json();
      dispatch({ type: "request/add/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "request/add/rejected", error: e.toString() });
    }
  };
};

export const removeRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: "request/delete/pending" });
    try {
      await fetch(`/request/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "request/delete/fulfilled", payload: id });
    } catch (e) {
      dispatch({ type: "request/delete/rejected", error: e.toString() });
    }
  };
};

export const editActiveRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: "requestActive/edit/pending" });

    try {
      const res = await fetch(`/request/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ active: true }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const json = res.json();
      dispatch({ type: "requestActive/edit/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "requestActive/edit/rejected", error: e.toString() });
    }
  };
};

export const selectAllRequests = (state) => {
  const { requests } = state;
  return requests.items.filter((item) => {
    return item.title.toLowerCase().indexOf(requests.filterText) > -1;
  });
};

export const selectRequestById = (state) => state.requests.itemsById;
