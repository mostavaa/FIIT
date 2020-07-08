import { START_LOADING, END_LOADING, DISABLE_RTL, ENABLE_RTL } from "../actions/creators/actions";
import { i18n } from "../../util";

const initState = {
  isLoading: false,
  isRTL: i18n.isRTL(),

};
export default (state = initState, action) => {
  const { type } = action;
  switch (type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case END_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case ENABLE_RTL:
      return { ...state, isRTL: true }
    case DISABLE_RTL:
      return { ...state, isRTL: false }
    default:
      return state;
  }
};
