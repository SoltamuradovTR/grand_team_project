const initialState = {
  signingUp: false,
  signingIn: false,
  error: null,
  token: null,
  role: null,
  candidate: null,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case "agent/signIn/pending":
      return {
        ...state,
        signingIn: true,
        error: null,
        token: null,
      };
    case "agent/signIn/fulfilled":
      return {
        ...state,
        signingIn: false,
        token: action.payload.token,
        role: action.payload.role,
        candidate: action.payload.candidate,
      };
    case "agent/signIn/rejected":
      return {
        ...state,
        signingIn: false,
        error: action.error,
      };
    case "client/signIn/pending":
      return {
        ...state,
        signingIn: true,
        error: null,
        token: null,
      };
    case "client/signIn/fulfilled":
      return {
        ...state,
        signingIn: false,
        token: action.payload.token,
        role: action.payload.role,
        candidate: action.payload.candidate,
      };

    case "client/signIn/rejected":
      return {
        ...state,
        signingIn: false,
        error: action.error,
      };
    case "user/logout/pending":
      return {
        ...state,
        signingIn: true,
        error: null,
        token: null,
      };
    case "user/logout/fulfilled":
      return {
        ...state,
        signingIn: false,
        token: null,
        role: null,
        candidate: null
      };
    case "user/logout/rejected":
      return {
        ...state,
        signingIn: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default login;

export const loginAgent = (login, password) => {
  return async (dispatch) => {
    dispatch({ type: "agent/signIn/pending" });

    const res = await fetch("/login/agent", {
      method: "POST",
      body: JSON.stringify({ login, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await res.json();

    if (json.error) {
      dispatch({ type: "agent/signIn/rejected", error: json.error });
    } else {
      dispatch({ type: "agent/signIn/fulfilled", payload: json });
      localStorage.setItem("token", json.token);
      localStorage.setItem("role", json.role);
    }
  };
};

export const loginClient = (login, password) => {
  return async (dispatch) => {
    dispatch({ type: "client/signIn/pending" });

    const res = await fetch("/login/client", {
      method: "POST",
      body: JSON.stringify({ login, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await res.json();

    if (json.error) {
      dispatch({ type: "client/signIn/rejected", error: json.error });
    } else {
      dispatch({ type: "client/signIn/fulfilled", payload: json });
      localStorage.setItem("token", json.token);
      localStorage.setItem("role", json.role);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: "user/logout/pending" });

    try {
      dispatch({ type: "user/logout/fulfilled" });

      localStorage.setItem("token", null);
      localStorage.setItem("role", null);
    } catch (e) {
      dispatch({ type: "user/logout/rejected" });
    }
  };
};

export const selectToken = (state) => state.login.token;

export const selectRole = (state) => state.login.role;

export const selectCandidate = (state) => state.login.candidate;
