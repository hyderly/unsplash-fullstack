import {
  UserRegistrationType,
  UserLoginType,
  UserVerifyType,
} from "./user.types";

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case UserRegistrationType.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserRegistrationType.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };

    case UserRegistrationType.USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case UserLoginType.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserLoginType.USER_LOGIN_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        userInfo: action.payload,
      };

    case UserLoginType.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const verifyUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UserVerifyType.USER_VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserVerifyType.USER_VERIFY_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };

    case UserVerifyType.USER_VERIFY_FAIL:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
