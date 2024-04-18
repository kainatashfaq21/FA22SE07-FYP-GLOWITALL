import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser, sendOTP } from "../features/users/userSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const signUpSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup
    .string()
    .email("Email Should be valid")
    .required("Email is Required"),
  password: yup
    .string()
    .required("Password is Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long and contain at least one letter and one number"
    ),
});


const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      // const submit = await dispatch(sendOTP(values.email));
      // console.log(submit);
      const res = await dispatch(registerUser(values));
      if (res.payload.status == 200) {
        navigate("/sendotp");
      }
    },
  });
  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center">Sign Up</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                />
                <div className="error text-danger">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                <CustomInput
                  type="lastname"
                  name="lastname"
                  placeholder="Last Name"
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                />
                <div className="error text-danger">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error text-danger">
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error text-danger">
                  {formik.touched.password && formik.errors.password}
                </div>
                {/* <button className="button border-0" type="submit">
                      Login
                    </button> */}
                <div>
                  <div style={{ display: "inline-block" }}>
                    <p style={{ display: "inline" }}>
                      Already have an account?{" "}
                    </p>
                    <Link to="/login" style={{ display: "inline" }}>
                      Login
                    </Link>
                  </div>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-itmes-center">
                    <button className="button border-0" type="submit">
                      SignUp
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
