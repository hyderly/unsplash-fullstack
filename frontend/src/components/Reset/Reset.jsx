import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import Alert from "../Alert/Alert";
import Loader from "../Loader/Loader";

import { resetPasswordAction } from "../../redux/user/user.actions";

const ResetPassword = ({ match }) => {
  const dispatch = useDispatch();
  const resetPassword = useSelector(state => state.resetPassword);
  const { loading, success, error } = resetPassword;

  useState(() => {
    if (success) {
      match.push("/login");
    }
  }, [success]);

  const registerSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),

    confirmPassword: yup
      .string()
      .required("Confirm Password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <Formik
      initialValues={{
        
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(resetPasswordAction(values.password, valaues.confirmPassword));
      }}
    >
      {({ isSubmitted, isValid }) => (
        <div className="form-box">
          <h1 className="form-title">Reset Password</h1>
          {error ? (
            <Alert danger>{error}</Alert>
          ) : success ? (
            <Alert>Your password has been reset </Alert>
          ) : (
            ""
          )}
          <Form>
            <div className="input-group">
              <Field
                type="password"
                name="password"
                placeholder="Your Password ... "
              />
              <ErrorMessage
                name="password"
                component="div"
                className="errorMessage"
              />
            </div>
            <div className="input-group">
              <Field
                type="password"
                name="confirmPassword"
                placeholder="ReEnter Password ... "
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="errorMessage"
              />
            </div>
            {loading ? (
              <Loader />
            ) : (
              <button type="submit" className="btn-primary">
                Reset
              </button>
            )}
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default ResetPassword;
