import { SIGN_IN, SIGN_OUT, RESTORE_TOKEN } from "../actions/creators/actions";

const initState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};
export default (state = initState, action) => {
  const { type } = action;
  switch (type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case SIGN_IN:
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    default:
      return state;
  }
};
