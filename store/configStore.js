import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import { UIReducer , userReducer } from "./reducers";

const rootReducer = combineReducers({
  UI: UIReducer,
  user:userReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  return createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))
};

export const { dispatch } = configureStore;
export default configureStore;
