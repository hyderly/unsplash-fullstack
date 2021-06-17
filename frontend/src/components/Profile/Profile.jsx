import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { getUserProfileAction } from "../../redux/user/user.actions";

const Profile = ({ history }) => {
  const [name, setName] = useState("haider ali");
  const [email, setEmail] = useState("haider.aumer@gmail.com");

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector(state => state.userProfile);
  const { loading, success, userDetail, error } = userProfile;

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
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required"),
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
        console.log(values);
      }}
    >
      {({ isSubmitted, isValid }) => (
        <div className="form-box">
          <h1 className="form-title">Profile</h1>
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
              <Field type="text" name="password" placeholder="Your Password " />
              <ErrorMessage
                name="password"
                component="div"
                className="errorMessage"
              />
            </div>
            <div className="input-group">
              <Field
                type="text"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="errorMessage"
              />
            </div>
            <button type="submit" className="btn-primary">
              Update
            </button>
          </Form>
        </div>
      )}
    </Formik>

    // <div className="form-box">
    //   <h1 className="form-title">Profile</h1>
    // </div>
  );
};

export default Profile;
