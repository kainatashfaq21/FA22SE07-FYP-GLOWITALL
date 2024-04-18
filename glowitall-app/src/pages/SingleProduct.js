import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import Container from "../components/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAProduct } from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProductToCart } from "../features/users/userSlice";
import { getUserCart } from "../features/users/userSlice";
import { addRating } from "../features/products/productSlice";
import axios from "axios";
import { base_url } from "../utils/axiosConfig";
import FeaturedProducts from "../components/FeaturedProducts";
const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.singleproduct);
  const cartState = useSelector((state) => state.auth.cartProducts);
  const [resData, setFeatured] = useState([]);

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  
 

  const getSingle = async () => {
    const res = await dispatch(getAProduct(getProductId));
    console.log(res);
  };
  useEffect(() => {
    // dispatch(getAProduct(getProductId));
    getSingle();
    dispatch(getUserCart());
  }, [dispatch]);

  useEffect(() => {
    if (cartState) {
      for (let index = 0; index < cartState.length; index++) {
        if (getProductId === cartState[index]?.productId?._id) {
          setAlreadyAdded(true);
        }
      }
    }
  }, []);

  const uploadCart = async () => {
    if (!productState.category.includes("skincare") && color === null) {
      toast.error("Please choose color!");
      return false;
    }

    const data = {
      productId: productState._id,
      quantity,
      price: productState.price,
      color: productState.category.includes("skincare") ? null : color,
    };

    const res = dispatch(addProductToCart(data));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}product/get/featured`);

        if (response.data?.status === 200) {
          setFeatured(response.data.data);
        } else {
          setFeatured([]);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };
    fetchData();
  }, []);

  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Please Add Star Rating");
      return false;
    } else if (comment === null) {
      toast.error("Please Write Review about the Product");
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId })
      );

      dispatch(getAProduct(getProductId));

      window.location.href = `http://localhost:3000/product/${getProductId}`;
    }

    return false;
  };
  const props = {
    width: 400,
    height: 400,
    zoomWidth: 400,
    img: productState?.images[0]?.url
      ? productState?.images[0]?.url
      : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2048px-Solid_white.svg.png",
  };
  const [orderedProduct, setOrderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title={productState?.title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>

            <div className="other-product-images d-flex flex-wrap gap-15">
              {productState?.images.map((item, index) => {
                return (
                  <div>
                    <img className="img-fluid" src={item?.url} alt="" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">Rs. {productState?.price} PKR</p>
                <ReactStars
                  // count={5}
                  size={24}
                  value={productState?.totalrating.toString()}
                  edit={false}
                  activeColor="#ffd700"
                />

                <p className="mb-0 t-review">
                  ({productState?.ratings?.length} Review)
                </p>
              </div>
              <a className="review-btn" href="#review">
                Write a Review
              </a>
            </div>
            <div className=" py-3">
              <div className="d-flex gap-10 align-items-center my-2">
                <h3 className="product-heading">Brand :</h3>
                <p className="product-data">{productState?.brand}</p>
              </div>
              <div className="d-flex gap-10 align-items-center my-2">
                <h3 className="product-heading">Category :</h3>
                <p className="product-data">{productState?.category}</p>
              </div>
              <div className="d-flex gap-10 align-items-center my-2">
                <h3 className="product-heading">Tags :</h3>
                <p className="product-data">{productState?.tags}</p>
              </div>
              <div className="d-flex gap-10 align-items-center my-2">
                <h3 className="product-heading">Availablity :</h3>
                <p className="product-data">{productState?.quantity} Items</p>
              </div>

              
           
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className="product-heading">Color :</h3>
                    <Color
                      setColor={setColor}
                      colorData={productState?.color}
                    />
                  </div>
               
              <div className="d-flex align-items-center gap-15 flex-row mb-3">
               
             
                    <h3 className="product-heading">Quantity :</h3>
                    <div className="">
                      <input
                        type="number"
                        name=""
                        min={1}
                        max={10}
                        className="form-control"
                        style={{ width: "70px" }}
                        id=""
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                      />
                    </div>
                
                
                <div
                  className={
                    alreadyAdded
                      ? "ms-0"
                      : "ms-5" + "d-flex align-items-center gap-30 ms-5"
                  }
                >
                  <div className="mt-3 d-flex justify-content-center gap-15 align-itmes-center mb-2">
                    <button
                      className="button border-0"
                      /* data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"*/
                      type="button"
                      onClick={() => {
                       uploadCart();
                      }}
                      
                    >
                      { "Add to Cart"}
                    </button>
                  </div>
                  {/*<div className="mt-3 d-flex justify-content-center gap-15 align-itmes-center mb-2">
                    <button className="button border-0">
                      Buy Now
                    </button>
                    </div>*/}
                </div>
              </div>

              <div className="d-flex gap-10 align-items-center my-3">
                <h3 className="product-heading">Shipping and Returns :</h3>
                <p className="product-data">
                  Free shipping and return available!
                  <br /> {""}
                  We ship worldwide &nbsp;
                  <b>5-10 buisness days!</b>
                </p>
              </div>
              <div className="d-flex gap-10 align-items-center my-3">
                <h3 className="product-heading">Copy Product Link :</h3>
                <a
                  href="javascript:void(0);"
                  style={{ color: "black", textDecoration: "none" }}
                  onClick={() => {
                    copyToClipboard(window.location.href);
                  }}
                >
                  Get Product Link Here
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{ __html: productState?.description }}
              ></p>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="description-wrapper py-1 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Ingredients</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{ __html: productState?.ingredients }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wraper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={productState?.totalrating.toString()}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">
                      Total Reviews {productState?.ratings?.length}
                    </p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write A Review{" "}
                    </a>
                  </div>
                )}
              </div>

              <div className="review-form py-4">
                <h4>Write A Review</h4>

                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={true}
                    activeColor="#ffd700"
                    onChange={(e) => {
                      setStar(e);
                    }}
                  />
                </div>

                <div>
                  <textarea
                    name=""
                    id=""
                    className="w-100 form-control"
                    cols="30"
                    rows="4"
                    placeholder="Comments"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button
                    onClick={addRatingToProduct}
                    className="button border-0"
                    type="button"
                  >
                    Submit Review
                  </button>
                </div>
              </div>

              <div className="reviews mt-3">
                {productState &&
                  productState.ratings?.map((item, index) => {
                    return (
                      <div key={index} className="review">
                        <div className="d-flex gap-10 align-items-center">
                          {/*<h6 className="mb-0">GlowItAll</h6>*/}
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.star}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>

                        <p className="mt-3">{item?.comment}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Featured Products</h3>
          </div>
          <FeaturedProducts data={resData} grid={6} />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;

