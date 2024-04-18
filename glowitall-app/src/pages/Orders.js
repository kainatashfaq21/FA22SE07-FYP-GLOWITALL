import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/users/userSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(
    (state) => state?.auth?.getorderedProduct?.orders
  );
  console.log(orderState);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <>
      <Meta title={"My Orders"} />
      <BreadCrumb title="My Orders" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h5>Order Id</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount</h5>
              </div>
              <div className="col-3">
                <h5>Status</h5>
              </div>
              <div className="col-3">
                <h5>Order Status</h5>
              </div>
            </div>
            <div className="col-12 mt-3">
              {orderState &&
                orderState?.map((item, index) => {
                  return (
                    <div
                      style={{ backgroundColor: "white" }}
                      className="row pt-3 my-3"
                      key={index}
                    >
                      <div className="row" style={{marginLeft:"2px"}}>
                        <div className="col-3">
                          <p>{item._id}</p>
                        </div>
                        <div className="col-3">
                          <p>Rs. {item.totalPrice} PKR</p>
                        </div>
                        <div className="col-3">
                          <p>{item.orderStatus}</p>
                        </div>
                        <div className="col-3">
                          <p>{item.paymentStatus}</p>
                        </div>
                      </div>

                      <div className="col-12">
                        <div
                          className="row py-3"
                          style={{ backgroundColor: "#ECECEC" }}
                        >
                          <div className="col-3">
                            <h5 className="text-dark">Product Name</h5>
                          </div>
                          <div className="col-3">
                            <h5 className="text-dark">Quantity</h5>
                          </div>
                          <div className="col-3">
                            <h5 className="text-dark">Color</h5>
                          </div>
                          <div className="col-3">
                            <h5 className="text-dark">Price</h5>
                          </div>
                          {item?.orderItems?.map((i, index) => {
                            return (
                              <div className="col-12">
                                <div className="row p-3">
                                  <div className="col-3">
                                    <p className="text-dark">
                                      {i?.productId?.title}
                                    </p>
                                  </div>
                                  <div className="col-3">
                                    <p className="text-dark">{i?.quantity}</p>
                                  </div>
                                  <div className="col-3">
                                    <ul className="colors ps-0">
                                      <li
                                        style={{
                                          backgroundColor: i?.color
                                            ? i.color.title
                                            : "",
                                        }}
                                      ></li>
                                    </ul>
                                  </div>
                                  <div className="col-3">
                                    <p className="text-dark">{i.price}</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Orders;
