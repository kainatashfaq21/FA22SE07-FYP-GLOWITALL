import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";
import { AiOutlineZoomIn } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  addToWishlistProduct,
} from '../features/eyesSkincareProducts/eyesSkincareProductSlice';

const EyesSkincareCard = (props) => {
  const { grid } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const products = useSelector(state => state.eyesSkincareProduct.product);

  useEffect(() => {
    dispatch(fetchAllProducts());
    console.log(fetchAllProducts);
  }, [dispatch]);

  const addToWish = (id) => {
    dispatch(addToWishlistProduct(id));
  };

  return (
    <>
      {Array.isArray(products) &&
        products.map((product) => (
          <div
            key={product._id}
            className={`${
              location.pathname === "/store" ? `gr-${grid}` : "col-3"
            }`}
          >
            <div to="/product/:id" className="product-card position-relative">
              <div className="whishlist-icon  position-absolute">
                <button className="border-0 bg-transparent">
                  <HiOutlineHeart
                    onClick={() => addToWish(product?._id)}
                    className="fs-4"
                  />
                </button>
              </div>

              <div className="product-image">
                <img
                  src={product?.images[0]?.url}
                  className="img-fluid w-100 h-100"
                  alt="product"
                />
                <img
                  src="https://www.shutterstock.com/image-photo/lipstick-fashion-colorful-lipsticks-over-260nw-1017284011.jpg"
                  className="img-fluid w-100 h-100"
                  alt="product"
                  width="250px"
                />
              </div>
              <div className="product-details">
                <h6 className="brand">{product?.brand}</h6>
                <h5 className=" product-title">{product?.title}</h5>
                <ReactStars
                  count={5}
                  value={product?.totalrating.toString()}
                  edit={false}
                  size={24}
                  activeColor="#ffd700"
                />
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: product?.description }}
                ></p>
                <p>
                  <div className="price">$ {product?.price}</div>
                </p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-10">

                  <Link
                    to={"/product/" + product?._id}
                    className="border-0 bg-transparent"
                  >
                    <AiOutlineZoomIn className="fs-4" />
                  </Link>
                  <button className="border-0 bg-transparent">
                    <BsCartPlus className="fs-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default EyesSkincareCard;
