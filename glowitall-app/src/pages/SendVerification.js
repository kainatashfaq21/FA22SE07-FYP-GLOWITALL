import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPasswordToken,
  registerUser,
  verifyOTP,
} from "../features/users/userSlice";
import { min } from "moment";

const Schema = yup.object({
  otp: yup.number().required("OTP is required").min(6, "OTP must be 6 digits"),
});

const SendVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(60); // State to manage the remaining time
  const [showResendButton, setShowResendButton] = useState(false); // State to manage the visibility of the "Resend OTP" button

  const getemail = localStorage.getItem("singupverify")
    ? JSON.parse(localStorage.getItem("singupverify")).email
    : null;

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Schema,
    onSubmit: async (values) => {
      const res = await dispatch(
        verifyOTP({ otp: values.otp, email: getemail })
      );
      if (res.payload.status == 200) {
        navigate("/login");
      }
    },
  });

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleResendOTP = async () => {
    try {
      setResendDisabled(true);
      setShowResendButton(false);
      setTimer(60);

      const res = await dispatch(registerUser({ email: getemail }));

      // If verification code is sent successfully, start the timer again
      if (res.payload.status === 200) {
        startTimer();
      } else {
        // Handle the case when verification code sending fails
        console.log("Failed to send verification code");
      }
    } catch (error) {
      console.log("Failed to resend OTP:", error);
    }
  };

  const startTimer = () => {
    const startTime = Math.floor(Date.now() / 1000); // Get the current time in seconds

    const updateTimer = () => {
      const currentTime = Math.floor(Date.now() / 1000); // Get the current time in seconds
      const elapsedSeconds = currentTime - startTime; // Calculate the elapsed seconds

      if (elapsedSeconds >= 60) {
        // Timer has expired
        setTimer(0);
      } else {
        setTimer(60 - elapsedSeconds); // Update the timer with the remaining seconds
        setTimeout(updateTimer, 1000); // Call the updateTimer function every second
      }
    };

    updateTimer(); // Start the timer
  };

  useEffect(() => {
    startTimer(); // Start the initial timer
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setShowResendButton(true);
    }
  }, [timer]);

  return (
    <>
      <Meta title={"Email Verification"} />
      <BreadCrumb title="Email Verification" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center">Enter OTP here</h3>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="number"
                  name="otp"
                  placeholder="000000"
                  onChange={formik.handleChange("otp")}
                  onBlur={formik.handleBlur("otp")}
                  value={formik.values.otp}
                />
                <div className="error text-center">
                  {formik.touched.otp && formik.errors.otp}
                </div>

                <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                  {showResendButton ? (
                    <button
                      className="button border-0 align-items-center"
                      type="button"
                      onClick={handleResendOTP}
                      disabled={resendDisabled}
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <>
                      <button
                        className="button border-0 align-items-center"
                        type="submit"
                      >
                        Verify
                      </button>
                      <div>
                        <span>Resend OTP in: </span>
                        <span>{formatTime(timer)}</span>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SendVerification;
