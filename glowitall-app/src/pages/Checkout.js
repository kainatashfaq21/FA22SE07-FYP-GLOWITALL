import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import { createAnOrder } from "../features/users/userSlice";
import { ToastContainer, toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  address: yup.string().required("Address Details are Required"),
  state: yup.string().required("State is Required"),
  city: yup.string().required("City is Required"),
  country: yup.string().required("Country is Required"),
  pincode: yup.number().required("Pincode is Required"),
});

const Checkout = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState([]);
  const [paymentId, setPaymentId] = useState("");
  const [successfullpayment, setSuccessfullpayment] = useState(false);
  const [cartProductState, setCartProductState] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotalAmount(sum);
    }
    setCartProductState(cartState);
  }, [cartState]);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstname,
      lastName: user?.lastname,
      address: user?.address,
      state: "",
      city: "",
      country: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      console.log(values);
      if (totalAmount < 5) {
        toast.info("please select products first");
        return;
      }
      console.log(values);
      alert(JSON.stringify(values));
      setShippingInfo(values);
      setTimeout(() => {
        checkOutHandler();
      }, 3000);
    },
  });
  useEffect(() => {
    setShippingInfo(formik.values);
  }, [formik.values]);
  console.log(shippingInfo);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++)
      items.push({
        product: cartState[index]?.productId?._id,
        quantity: cartState[index]?.quantity,
        color: cartState[index]?.color,
        price: cartState[index]?.price,
      });
  }, [cartState]);

  console.log(cartState);

  const handleCashDelivery = async (event) => {
    event.preventDefault(); // Prevent form submission
    alert("Are you sure you want to place the order?");
    const res = await dispatch(
      createAnOrder({
        totalPrice: totalAmount + 5,
        totalPriceAfterDiscount: totalAmount + 5,
        orderItems: cartProductState,
        paymentInfo: "xyz",
        shippingInfo: shippingInfo,
        paymentStatus: "cash on delivery",
      })
    );
    console.log(res.payload.success);
    // Redirect to payment success page or any other desired action
    navigate("/payment-success");
  };

  const checkOutHandler = async () => {
    const result = await axios.post(
      "http://localhost:5000/api/user/order/checkout",
      { amount: totalAmount + 150 },
      config
    );
    if (!result) {
      alert("Something went wrong!");
      return;
    }
    // console.log(result?.data?.url);
    // console.log(result?.data?.session);
    const { id } = result?.data?.session;
    const { amount, currency } = result?.data;
    if (result) {
      const res = await dispatch(
        createAnOrder({
          totalPrice: amount / 100,
          totalPriceAfterDiscount: amount / 100,
          orderItems: cartProductState,
          paymentInfo: id,
          shippingInfo: shippingInfo,
        })
      );
      console.log(res?.payload?.success);
      if (res?.payload?.success == true) {
        window.location.assign(result?.data?.url);
      }
    }
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
                      <Link className="text-dark total-price" to="/cart">
                        Cart
                      </Link>
                    </li>
                    &nbsp; /
                    <Link
                      className="text-dark active total-price  "
                      to="/check-out"
                    >
                      Checkout
                    </Link>
                    &nbsp; /
                    <li
                      className="text-dark  total-price  "
                      to="/payment-success"
                      disabled={true}
                    >
                      Payment status
                    </li>
                  </ol>
                </nav>

                <h4 className="title total">Contact Information</h4>
                <p className="user-details total">
                  {`${user?.firstname} ${user?.lastname} (${user?.email})`}
                </p>

                <h4 className="mb-3">Shipping Address</h4>
                <form
                  onSubmit={formik.handleSubmit}
                  action=""
                  className="d-flex flex-wrap gap-15 justify-content-between"
                >
                  <div className="w-100">
                    <select
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange("country")}
                      onBlur={formik.handleBlur("country")}
                      className="form-control form-select"
                      id=""
                    >
                      color
                      <option value="" selected disabled>
                        Select Country
                      </option>
                      <option value="Pakistan">Pakistan</option>
                    </select>

                    <div className="error ms-2 my-1">
                      {formik.touched.country && formik.errors.country}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                    />

                    <div className="error ms-2 my-1">
                      {formik.touched.firstName && formik.errors.firstName}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange("lastName")}
                      onBlur={formik.handleBlur("lastName")}
                    />

                    <div className="error ms-2 my-1">
                      {formik.touched.lastName && formik.errors.lastName}
                    </div>
                  </div>

                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Address"
                      className="form-control"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange("address")}
                      onBlur={formik.handleBlur("address")}
                    />

                    <div className="error ms-2 my-1">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>

                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Appartment, Suite etc"
                      className="form-control"
                      name="other"
                      value={formik.values.other}
                      onChange={formik.handleChange("other")}
                      onBlur={formik.handleBlur("other")}
                    />
                  </div>

                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="City"
                      className="form-control"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                    />

                    <div className="error ms-2 my-1">
                      {formik.touched.city && formik.errors.city}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <select
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange("state")}
                      onBlur={formik.handleBlur("state")}
                      className="form-control form-select"
                      id=""
                    >
                      <option value="" selected disabled>
                        Select State
                      </option>
                      <option value="Punjab">Punjab</option>
                    </select>
                  </div>

                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Zipcode"
                      className="form-control"
                      name="pincode"
                      value={formik.values.pincode}
                      onChange={formik.handleChange("pincode")}
                      onBlur={formik.handleBlur("pincode")}
                    />
                  </div>

                  <div className="error ms-2 my-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>

                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/cart" className="text-dark">
                        <BiArrowBack className="me-2" />
                        Return To Cart
                      </Link>
    
                      <div style={{margin:"40px",marginLeft:"60px",border:"0px"}}>
                      <button className="button" type="submit" >
                        Pay online
                      </button>
                      <button className="button" onClick={handleCashDelivery}>
                        Cash On delivery
                      </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-5">
              <div className="border-bottom py-4">
                {cartState &&
                  cartState?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex gap-10 mb-2 align-items-center"
                      >
                        <div className="w-75 d-flex gap-10">
                          <div className="w-25 position-relative">
                            <span
                              style={{ top: "-10px", right: "2px" }}
                              className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                            >
                              {item?.quantity}
                            </span>
                            <img
                              width={100}
                              height={100}
                              src={item?.productId?.images[0]?.url}
                              alt="image"
                            />
                          </div>
                          <div>
                            <h5 className="title">{item?.productId?.title}</h5>
                            <ul className="colors ps-0">
                              <li
                                style={{ backgroundColor: item?.color?.title }}
                              ></li>
                            </ul>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="total-price">
                            {item?.price * item?.quantity}
                          </h5>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Subtotal</p>
                  <p className="total-price">
                    Rs. {totalAmount ? totalAmount : "0"} PKR
                  </p>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">Rs. 150</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">
                  Rs. {totalAmount > 0 ? totalAmount + 150 : 150} PKR
                </h5>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </Container>
    </>
  );
};

export default Checkout;