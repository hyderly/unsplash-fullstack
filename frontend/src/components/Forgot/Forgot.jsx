import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { forgotPasswordAction } from "../../redux/user/user.actions";

import Alert from "../../components/Alert/Alert";
import Loader from "../Loader/Loader";

const Forgot = () => {
  const dispatch = useDispatch();
  const forgotPassword = useSelector(state => state.forgotPassword);
  const { loading, success, error } = forgotPassword;

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email is required"),
  });
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(forgotPasswordAction(values.email));
      }}
    >
      {({ isSubmitted, isValid }) => (
        <div className="form-box">
          <h1 className="form-title">Forgot Password</h1>
          {error ? (
            <Alert danger>{error}</Alert>
          ) : success ? (
            <Alert>Forgot Password Email Has been Sent</Alert>
          ) : (
            ""
          )}
          <Form>
            <div className="input-group">
              <Field name="email" placeholder="Your Email ... " />
              <ErrorMessage
                name="email"
                component="div"
                className="errorMessage"
              />
            </div>
            {loading ? (
              <Loader />
            ) : (
              <button type="submit" className="btn-primary">
                Sent Email
              </button>
            )}
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Forgot;
