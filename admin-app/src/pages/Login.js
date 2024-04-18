import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@mui/material";
import { login } from "../features/auth/authSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const authState = useSelector((state) => state?.user);
  console.log(authState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const res = await dispatch(login(values));
        console.log(res);
        if (res.payload.status == 200) {
          toast.success("login successfull");
          setTimeout(() => {
            window.location.href = "http://localhost:3001/admin";
          }, 3000);
        } else {
          toast.error("Invalid credentials ");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container
        maxWidth="xs"
        style={{
          padding: "16px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          background: "rgba(123, 124, 234, 0.2)",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            type="email"
            name="email"
            label="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            style={{ marginBottom: "16px" }}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            style={{ marginBottom: "16px" }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <Button variant="contained" type="submit">
              Login
            </Button>
          </div>
        </form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Login;
