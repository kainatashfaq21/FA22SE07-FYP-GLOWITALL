import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";
import { AiOutlineZoomIn } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";

const FeaturedProducts = ({ grid, data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };
  const handleProductClick = (productId) => {
    window.location.href = `/product/${productId}`;
  };
  return (
    <div className="product-container">
      {Array.isArray(data) &&
        data.map((item, index) => (
          <div
            key={item._id}
            className={`${
              location.pathname === "/store" ? `gr-${grid}` : "col-3"
            } ${hoveredCard === index ? "card-hovered" : ""}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-wrapper">
              <div to="/product/:id" className="product-card position-relative">
                <div className="whishlist-icon position-absolute">
                  <button className="border-0 bg-transparent">
                    <HiOutlineHeart
                      onClick={() => addToWish(item._id)}
                      className="fs-4"
                    />
                  </button>
                </div>

                <div className="product-image">
                  <img
                    src={item.images[0]?.url}
                    className="img-fluid w-100 h-100"
                    alt="product"
                  />
                </div>
                <div className="product-details">
                  <h6 className="brand">{item.brand}</h6>
                  <h5 className="product-title">{item.title}</h5>
                  <ReactStars
                    count={5}
                    value={item.totalrating.toString()}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                  />
                  {grid === 12 && (
                    <p
                      className="description d-block"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></p>
                  )}
                  <p>
                    <div className="price">Rs. {item.price} PKR</div>
                  </p>
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-10">
                    
                    <Link
                      onClick={() => handleProductClick(item._id)}
                      className="border-0 bg-transparent"
                    >
                      <AiOutlineZoomIn className="fs-4" />
                    </Link>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FeaturedProducts;
