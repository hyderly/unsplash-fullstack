import axios from "axios";

import {
  UserRegistrationType,
  UserLoginType,
  UserVerifyType,
} from "./user.types";

export const userRegiterAction = (name, email, password) => async dispatch => {
  try {
    dispatch({ type: UserRegistrationType.USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "api/users/register",
      { name, email, password },
      config
    );

    dispatch({
      type: UserRegistrationType.USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UserRegistrationType.USER_REGISTER_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const loginAction = (email, password) => async dispatch => {
  try {
    dispatch({
      type: UserLoginType.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: UserLoginType.USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UserLoginType.USER_LOGIN_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const verifyUserAction = verifyToken => async dispatch => {
  try {
    dispatch({
      type: UserVerifyType.USER_VERIFY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/users/emailverify/${verifyToken}`,
      "",
      config
    );

    dispatch({
      type: UserVerifyType.USER_VERIFY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UserVerifyType.USER_VERIFY_FAIL,
      payload: error.response.data.error,
    });
  }
};
