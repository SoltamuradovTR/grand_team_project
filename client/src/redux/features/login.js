const initialState = {
  signingUp: false,
  signingIn: false,
  error: null,
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case "agent/signUp/pending":
      return {
        ...state,
        signingUp: true,
        error: null,
      };
    case "agent/signUp/fulfilled":
      return {
        ...state,
        signingUp: false,
      };
    case "agent/signUp/rejected":
      return {
        ...state,
        signingUp: false,
        error: action.error,
      };
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
      };

    case "client/signIn/rejected":
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

export const registrationAgent = (data) => {
  return async (dispatch) => {
    dispatch({ type: "agent/signUp/pending" });

    const res = await fetch("/agent", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await res.json();

    if (json.error) {
      dispatch({ type: "agent/signUp/rejected", error: json.error });
    } else {
      dispatch({ type: "agent/signUp/fulfilled", payload: json });
    }
  };
};

export const selectToken = (state) => state.login.token;

export const selectRole = (state) => state.login.role;
