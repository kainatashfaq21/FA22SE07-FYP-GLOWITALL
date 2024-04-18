import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineZoomIn } from "react-icons/ai";
import { HiOutlineHeart } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";



const FaceMakeupCard = ({ grid, data }) => {
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
  console.log("=====<>", grid);
  return (
    <>
      {Array.isArray(data) &&
        data.map((item, index) => (
          <div
            key={item._id}
            className={`${grid ? `gr-${grid}` : "col-4"} ${
              hoveredCard === index ? "card-hovered" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
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
                    to={"/product/" + item._id}
                    className="border-0 bg-transparent"
                  >
                    <AiOutlineZoomIn className="fs-4" style={{color:"black"}}/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default FaceMakeupCard;
