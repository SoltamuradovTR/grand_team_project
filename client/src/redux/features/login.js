const initialState = {
  signingUp: false,
  signingIn: false,
  error: null,
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  candidate: localStorage.getItem("candidate")
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
    case 'user/logout/pending':
      return {
        ...state,
        signingIn: true,
        error: null,
        token: null,
      };
    case 'user/logout/fulfilled':
      return {
        ...state,
        signingIn: false,
        token: null,
        role: null
      };
    case 'user/logout/rejected':
      return {
        ...state,
        signingIn: false,
        error: action.error,
      }
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
      console.log(json)
      localStorage.setItem("token", json.token);
      localStorage.setItem("role", json.role);
      localStorage.setItem("candidate", json.candidate)
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
      dispatch({ type: 'user/logout/pending'})

      try {
        dispatch({ type: 'user/logout/fulfilled'})

        localStorage.setItem('token', null)
        localStorage.setItem('role', null)
      } catch (e) {
        dispatch({ type: 'user/logout/rejected'})
      }
    }
}

export const selectToken = (state) => state.login.token;

export const selectRole = (state) => state.login.role;
