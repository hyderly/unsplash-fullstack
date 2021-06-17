import {
  UserRegistrationType,
  UserLoginType,
  UserVerifyType,
  ForgotPasswordType,
  ResetPasswordType,
  UserProfileType,
  UserUpdateType,
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

    case UserLoginType.USER_LOGOUT:
      return {
        ...state,
        userInfo: null,
        success: false,
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

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case ForgotPasswordType.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ForgotPasswordType.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case ForgotPasswordType.FORGOT_PASSWORD_FAIL:
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

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case ResetPasswordType.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ResetPasswordType.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };

    case ResetPasswordType.RESET_PASSWORD_FAIL:
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

export const userProfileReducer = (state = { userDetail: {} }, action) => {
  switch (action.type) {
    case UserProfileType.USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserProfileType.USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userDetail: action.payload,
      };

    case UserProfileType.USER_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    case UserProfileType.USER_PROFILE_RESET:
      return {
        ...state,
        userDetail: {},
      };

    default:
      return state;
  }
};

export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UserUpdateType.USER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserUpdateType.USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.payload,
      };

    case UserUpdateType.USER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        success: true,
        error: action.payload,
      };

    default:
      return state;
  }
};
