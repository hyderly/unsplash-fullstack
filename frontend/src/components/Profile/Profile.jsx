import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const Profile = () => {
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
        name: "Haider",
        email: "haider@gmail.com",
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
              <Field type="text" name="email" placeholder="Your Email ... " />
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
