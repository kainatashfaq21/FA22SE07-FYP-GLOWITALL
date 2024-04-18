import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { ToastContainer, toast } from "react-toastify";
import { base_url } from "../utils/axiosConfig";


const PaymentSuccess = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("userToken"));
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionParam = urlParams.get("session_id");
    setSessionId(sessionParam);
    const updateOrderPaymentStatus = async () => {
      try {
        const response = await fetch(
          `${base_url}user/orders/payment/${sessionParam}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ paymentStatus: "paid" }),
          }
        );
        if (response.status == 200) {
          toast.info("Order Payment Successful");
          setTimeout(() => {
            window.location.href = "http://localhost:3000";
          }, 3000);
        }
      } catch (error) {
        toast.info("Internal Server Error");
      }
    };
    updateOrderPaymentStatus();
  }, []);

  return (
    <>
      <Meta title={"Checkout"} />
      <BreadCrumb title="Cart Information" />

      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">Glow It All</h3>
                <nav
                  style={{ "--bs-breadcrumb-divider": ">" }}
                  area-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link className="text-dark total-price" to="/">
                        Home /
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link
                        className="text-dark total-price"
                        to="/payment-success"
                        disabled={true}
                      >
                        Payment status
                      </Link>
                    </li>
                  </ol>
                </nav>
                <h4 className="title total">Your Payment Status</h4>
                <p className="user-details total">
                  Dear {`${user.firstname} ${user.lastname}`}, 
                  Thank you for using Glow It All. Your payment has been successful.
                  Go to "My Orders" to track your order.
                </p>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </Container>
    </>
  );
};

export default PaymentSuccess;
