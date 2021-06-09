import axios from "axios";

import { UserRegistrationType } from "./user.types";

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
      type: UserRegistrationType.USER_REGISTER_FALE,
      payload: error.response.data.error,
    });
  }
};
