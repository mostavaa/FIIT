import { RESTORE_TOKEN, SIGN_IN, SIGN_OUT } from "./actions";

export const restoreToken = (token) => ({
  type: RESTORE_TOKEN,
  token
});
export const signIn = (token) => ({
  type: SIGN_IN,
  token
});
export const signOut = () => ({
  type: SIGN_OUT,
  token:null
});