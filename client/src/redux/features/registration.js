const initialState = {
    signingUp: false,
    signingIn: false,
    error: null,
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
};

const registration = (state = initialState, action) => {
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
        default:
            return state;
    }
};

export default registration;


export const registrationAgent = (data) => {
    return async (dispatch) => {
        dispatch({ type: "agent/signUp/pending" });
        console.log(data)
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

//export const selectToken = (state) => state.login.token;

//export const selectRole = (state) => state.login.role;
