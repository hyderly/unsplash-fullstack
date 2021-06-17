import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import Alert from "../../components/Alert/Alert";
import Loader from "../Loader/Loader";

import {
  getUserProfileAction,
  updateUserAction,
} from "../../redux/user/user.actions";

const Profile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector(state => state.userProfile);
  const { userDetail } = userProfile;

  const updateUser = useSelector(state => state.updateUser);
  const { success, error, loading } = updateUser;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!userDetail.name) {
        dispatch(getUserProfileAction());
      } else {
        setName(userDetail.name);
        setEmail(userDetail.email);
      }
    }

    console.log(name, email);
  }, [userDetail, userInfo]);

  const profileSchema = yup.object().shape({
    name: yup.string(),
    email: yup.string(),
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
        name: name,
        email: email,
        password: "",
        confirmPassword: "",
      }}
      validationSchema={profileSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(updateUserAction(values));
      }}
    >
      {({ isSubmitted, isValid }) => (
        <div className="form-box">
          <h1 className="form-title">Profile</h1>
          {error ? (
            <Alert danger>{error}</Alert>
          ) : success ? (
            <Alert>User Update Successfully</Alert>
          ) : (
            ""
          )}
          <Form>
            <div className="input-group">
              <Field
                type="text"
                value={name}
                placeholder="Your Full Name ... "
              />
              <ErrorMessage
                name="name"
                component="div"
                className="errorMessage"
              />
            </div>
            <div className="input-group">
              <Field type="text" value={email} placeholder="Your Email ... " />
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
                placeholder="Your Password "
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
                placeholder="Confirm Password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="errorMessage"
              />
            </div>
            {loading ? (
              <button className="btn-primary">Updating ...</button>
            ) : (
              <button type="submit" className="btn-primary">
                Update
              </button>
            )}
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Profile;
