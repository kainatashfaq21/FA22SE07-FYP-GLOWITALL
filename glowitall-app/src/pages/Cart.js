import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../features/users/userSlice";
import { deleteCartProduct } from "../features/users/userSlice";
import { updateCartProduct } from "../features/users/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  const [totalAmount, setTotalAmount] = useState(null);
  // const userCartState = useSelector((state) => state.auth.cartProducts);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const fetchUserCart = () => {
    dispatch(getUserCart()).then((action) => {
      if (action) {
        const cartProduct = action?.payload;

        if (cartProduct) {
          toast.info(action?.payload?.message);
          setCartProducts(cartProduct);
        }
      } else {
        toast.info("An Error has occured try again");
      }
    });
  };

  useEffect(() => {
    fetchUserCart();
  }, []);
  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );

      setTimeout(() => {
        dispatch(getUserCart());
      }, 200);
    }
  }, [productUpdateDetail]);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct(id));
    window.location.reload();
    fetchUserCart();
  };
  console.log(cartProducts);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartProducts?.length ?? 0; index++) {
      sum =
        sum + Number(cartProducts[index].quantity) * cartProducts[index].price;
    }
    setTotalAmount(sum);
  }, [cartProducts, productUpdateDetail]);
  const handleCheckout = () => {
    if (cartProducts.length === 0) {
      toast.error("No products in the cart", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      return;
    }
  };

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>

            {cartProducts && cartProducts.length > 0 ? (
              cartProducts.map((item, index) => (
                <div
                  className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                  key={item._id}
                >
                  <div className="cart-col-1 gap-15 d-flex align-items-center">
                    <div className="w-50">
                      <img
                        src={item?.productId?.images[0]?.url}
                        alt="moisturizer"
                        style={{ width: "250px", height: "200px" }}
                      />
                    </div>
                    <div className="w-50">
                      <p>{item?.productId?.title}</p>
                      <p className="d-flex gap-3">
                        color:{" "}
                        <ul className="colors ps-0">
                          <li
                            style={{ backgroundColor: item?.color?.title }}
                          ></li>
                        </ul>{" "}
                      </p>
                    </div>
                  </div>
                  <div className="cart-col-2">
                    <h5 className="price">Rs. {item?.price} PKR</h5>
                  </div>
                  <div className="cart-col-3 d-flex align-items-center gap-15">
                    <div>
                      <input
                        className="form-control"
                        type="number"
                        name=""
                        min={1}
                        max={10}
                        id=""
                        value={
                          // productUpdateDetail?.quantity
                          //   ? productUpdateDetail?.quantity
                          //   : 
                            item?.quantity
                        }
                        onChange={(e) => {
                          const newQuantity = e.target.value;
                          setProductUpdateDetail({
                            cartItemId: item?._id,
                            quantity: e.target.value,
                          });
                          const updatedPrice = item?.price * newQuantity;
                          const updatedCartProducts = cartProducts.map(
                            (cartItem) => {
                              if (cartItem._id === item._id) {
                                return {
                                  ...cartItem,
                                  quantity: newQuantity,
                                };
                              }
                              return cartItem;
                            }
                          );
                          setCartProducts(updatedCartProducts);
                          setTotalAmount(
                            (prevAmount) =>
                              prevAmount -
                              item?.price * item?.quantity +
                              updatedPrice
                          );
                        }}
                      />
                    </div>
                    <div>
                      <AiFillDelete
                        onClick={() => {
                          deleteACartProduct(item?._id);
                        }}
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="cart-col-4">
                    <h5 className="price">Rs. {item?.price * item?.quantity} PKR</h5>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}

            <div>
              <div className="col-12 py-2 mt-4">
                <div className="d-flex justify-content-between">
                  <Link to="/Shop-All" className="button" style={{"width":"210px","height":"50px"}} >
                    Continue To Shopping
                  </Link>
                  {(totalAmount !== null || totalAmount !== 0) && (
                    <div className="d-flex flex-column align-items-end">
                      <h4>SubTotal: Rs. {totalAmount} PKR</h4>
                      <p> Taxes and shipping calculated at checkout</p>
                      <Link
                        to={user && cartProducts ? "/check-out" : null}
                        className={`button ${
                          !(user || !cartProducts) ? "disabled" : ""
                        }`}
                        onClick={handleCheckout}
                      >
                        Checkout
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </Container>
    </>
  );
};

export default Cart;
