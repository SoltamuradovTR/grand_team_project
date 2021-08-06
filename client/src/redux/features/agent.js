const initialState = {
  signingUp: false,
  signingIn: false,
  error: null,
};

const agent = (state = initialState, action) => {
  switch (action.type) {
    case "agent/signUp/pending":
      return {
        ...state,
        signingUp: true,
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
      };


    default:
      return state;
  }
};

export default agent;



