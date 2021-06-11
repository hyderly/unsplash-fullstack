import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { loginAction } from "../../redux/user/user.actions";

import Alert from "../../components/Alert/Alert";
import Loader from "../Loader/Loader";

const Login = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, success, error, userInfo } = userLogin;

  useEffect(() => {
    if (success) {
      history.push("/");
    }
  }, [success]);

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(loginAction(values.email, values.password));
      }}
    >
      {({ isSubmitted, isValid }) => (
        <div className="form-box">
          <h1 className="form-title">Login</h1>
          {error ? (
            <Alert danger>{error}</Alert>
          ) : success ? (
            <Alert>{success}</Alert>
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
            {loading ? (
              <Loader />
            ) : (
              <button disabled={loading} type="submit" className="btn-primary">
                Login
              </button>
            )}

            <Link className="form-link" to="/register">
              Not a member ?
            </Link>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
