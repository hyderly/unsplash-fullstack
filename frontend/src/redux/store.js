import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import logger from "redux-logger";
import thunk from "redux-thunk";

// Reducers
import {
  registerReducer,
  loginReducer,
  verifyUserReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  userProfileReducer,
  updateUserReducer,
} from "./user/user.reducers";

// get local values

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const rootReducers = combineReducers({
  userRegister: registerReducer,
  userLogin: loginReducer,
  userVerify: verifyUserReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  userProfile: userProfileReducer,
  updateUser: updateUserReducer,
});

const initialValues = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middlewares = [thunk];

if (process.env.NODE_ENV !== "production") {
  middlewares.push(logger);
}

const store = createStore(
  rootReducers,
  initialValues,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
