import axios from "axios";

import {
  UserRegistrationType,
  UserLoginType,
  UserVerifyType,
  ForgotPasswordType,
  ResetPasswordType,
  UserProfileType,
  UserUpdateType,
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

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UserLoginType.USER_LOGIN_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const userLogoutAction = () => dispatch => {
  dispatch({
    type: UserLoginType.USER_LOGOUT,
  });

  dispatch({
    type: UserProfileType.USER_PROFILE_RESET,
  });

  localStorage.removeItem("userInfo");
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

export const forgotPasswordAction = email => async dispatch => {
  try {
    dispatch({
      type: ForgotPasswordType.FORGOT_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post("/api/users/forgotpassword", { email }, config);

    dispatch({
      type: ForgotPasswordType.FORGOT_PASSWORD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ForgotPasswordType.FORGOT_PASSWORD_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const resetPasswordAction =
  (password, confirmPassword, resetToken) => async dispatch => {
    try {
      dispatch({
        type: ResetPasswordType.RESET_PASSWORD_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.put(
        `/api/users/resetpassword/${resetToken}`,
        { password, confirmPassword },
        config
      );

      dispatch({
        type: ResetPasswordType.RESET_PASSWORD_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ResetPasswordType.RESET_PASSWORD_FAIL,
        payload: error.response.data.error,
      });
    }
  };

export const getUserProfileAction = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: UserProfileType.USER_PROFILE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/users/profile", config);

    dispatch({
      type: UserProfileType.USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UserProfileType.USER_PROFILE_FAIL,
      error: error.response.data.error,
    });
  }
};

export const updateUserAction = user => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: UserUpdateType.USER_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put("/api/users/profile", user, config);

    dispatch({
      type: UserUpdateType.USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UserUpdateType.USER_UPDATE_FAIL,
      payload: error.response.data.error,
    });
  }
};
