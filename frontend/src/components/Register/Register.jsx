import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { userRegiterAction } from "../../redux/user/user.actions";

const Register = () => {
  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, success, message, error } = userRegister;

  const registerSchema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
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
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(userRegiterAction(values.name, values.email, values.password));
      }}
    >
      {({ isSubmitted, isValid }) => (
        <div className="form-box">
          <h1 className="form-title">Register</h1>
          <Form>
            <div className="input-group">
              <Field
                type="text"
                name="name"
                placeholder="Your Full Name ... "
              />
              <ErrorMessage
                name="name"
                component="div"
                className="errorMessage"
              />
            </div>
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
              <p>...loading...</p>
            ) : (
              <button type="submit" className="btn-primary">
                Register
              </button>
            )}

            <Link className="form-link" to="/login">
              Already a member ?
            </Link>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Register;
