const initialState = {
  error: null,
  loading: false,
  items: [],
};

const review = (state = initialState, action) => {
  switch (action.type) {
    case "reviews/fetch/pending":
      return {
        ...state,
        loading: true,
      };
    case "reviews/fetch/fulfilled":
      return {
        ...state,
        loading: true,
        items: action.payload,
      };
    case "reviews/fetch/rejected":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default review;

export const loadAllReviews = () => {
  return async (dispatch) => {
    dispatch({ type: "reviews/fetch/pending" });

    try {
      // const res = await fetch(`/reviews/agent/${}`);
      // const json = await res.json();
      // dispatch({ type: "reviews/fetch/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "reviews/fetch/rejected", error: e.toString() });
    }
  };
};

export const selectAllReviews = (state) => state.review.items;
