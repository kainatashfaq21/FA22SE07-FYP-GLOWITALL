import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {HiOutlineHeart} from "react-icons/hi";
import {AiOutlineZoomIn} from "react-icons/ai";
import {BsCartPlus} from "react-icons/bs";
import { useDispatch, useSelector} from "react-redux";
import {addToWishlist} from '../features/products/productSlice';
//can import images by name and then pass below in img src can be done in multiple files

const LipsMakeupCard = (props) => {
  
  const { grid, data } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const addToWish = (id) =>{
   dispatch(addToWishlist(id));
  }


  return (
   <>
     {Array.isArray(data) && // Check if data is an array
        data?.map((item, index) => {

          //const { _id, images, brand, title, totalrating, description, price } = props;

          return (
            <div key={index}
              className={` ${
                location.pathname === "/store" ? `gr-${grid}` : "col-3"
              }`}
            >
              <div to="/product/:id" className="product-card position-relative"> 
              <div className="whishlist-icon  position-absolute">
              <button className="border-0 bg-transparent">
                <HiOutlineHeart 
                onClick={()=>addToWish(item?._id)}
                className="fs-4" />
              </button>
            </div>

            <div className="product-image">
              <img
                src={item?.images[0]?.url}
                className="img-fluid w-100 h-100" //if image is big then change styling here
                alt="product"
              />
              <img
                src="https://www.shutterstock.com/image-photo/lipstick-fashion-colorful-lipsticks-over-260nw-1017284011.jpg" //here product name was given do check this
                className="img-fluid w-100 h-100"
                alt="product"
                width="250px"
              />
            </div>
            <div className="product-details">
              <h6 className="brand">{item?.brand}</h6>
              <h5 className=" product-title">{item?.title}</h5>
              <ReactStars
                count={5}
                value={item?.totalrating.toString()}
                edit={false}
                size={24}
                activeColor="#ffd700"
              />
              <p
                className={`description ${
                  grid === 12 ? "d-block" : "d-none"
                }`}
                dangerouslySetInnerHTML={{ __html: item?.description }}
              ></p>
              <p>
                <div className="price">$ {item?.price}</div>
              </p>
            </div>
            <div className="action-bar position-absolute">
              <div className="d-flex flex-column gap-10">
                <Link to={'/product/'+item?._id} className="border-0 bg-transparent">
                  <AiOutlineZoomIn 
                  className="fs-4"
                  />
                </Link>
                <button className="border-0 bg-transparent">
                  <BsCartPlus className="fs-4" />
                </button>
              </div>
            </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
export default LipsMakeupCard;
