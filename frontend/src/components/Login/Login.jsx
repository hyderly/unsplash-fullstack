import React from "react";
import { Link } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const Login = () => {
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
        console.log(values);
      }}
    >
      {({ isSubmitted, isValid }) => (
        <div className="form-box">
          <h1 className="form-title">Login</h1>
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
            <button type="submit" className="btn-primary">
            Login
            </button>
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
