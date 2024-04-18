import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const PaymentReject = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionParam = urlParams.get("session_id");
    setSessionId(sessionParam);
    deleteOrder(sessionParam);
  }, []);

  const deleteOrder = (sessionId) => {
    // Send Axios request to delete the order
    axios
      .delete(`/api/orders/delete/${sessionId}`)
      .then((response) => {
        console.log("Order deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

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
                        home
                      </Link>
                    </li>
                    &nbsp; /
                    <Link
                      className="text-dark  total-price  "
                      to="/payment-reject"
                      disabled={true}
                    >
                      payment status
                    </Link>
                  </ol>
                </nav>
                <h4 className="title total">Your Payment Status</h4>
                <p className="user-details total">
                  Dear{" "}
                  {`${user.firstname} ${user.lastname}, Thank you for using Glow it all, your payment was unsuccessful, please try again later`}
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

export default PaymentReject;
