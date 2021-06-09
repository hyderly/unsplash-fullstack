import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import logger from "redux-logger";
import thunk from "redux-thunk";

// Reducers
import { registerReducer } from "./user/user.reducers";

const rootReducers = combineReducers({
  userRegister: registerReducer,
});

const middlewares = [thunk];

if (process.env.NODE_ENV !== "production") {
  middlewares.push(logger);
}

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
