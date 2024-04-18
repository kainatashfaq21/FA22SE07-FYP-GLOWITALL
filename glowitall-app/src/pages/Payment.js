import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { BiRadioCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

const Payment = () => {
  return (
    <>
      <Meta title={"Payment"} />
      <BreadCrumb title="Cart Information / Payment" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="payment-card">
              <h3 className="text-center">Glow It All</h3>
              <h6>Choose Payment Method</h6>
              <h7>
                {" "}
                <BiRadioCircle className="fs-7" /> Card <br />{" "}
                <BiRadioCircle className="fs-7" /> Cash On Delivery
              </h7>
              <p className="mt-3">
                {" "}
                <RiArrowGoBackFill className="fs-7" /> Return To Information
              </p>
              <div>
                <div className="d-flex gap-15" style={{ marginLeft: "140px" }}>
                  <Link className="button apply"> Confirm Order</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Payment;
