import { UserRegistrationType } from "./user.types";

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

    case UserRegistrationType.USER_REGISTER_FALE:
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
