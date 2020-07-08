import { START_LOADING, END_LOADING, ENABLE_RTL, DISABLE_RTL } from "./actions";

export const startLoading = () => ({
  type: START_LOADING
});

export const endLoading = () => ({
  type: END_LOADING
});

export const enableRTL = () => ({
  type: ENABLE_RTL
})

export const disableRTL = () => ({
  type: DISABLE_RTL
})