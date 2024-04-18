import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/users/userSlice";
import { addToWishlist } from "../features/products/productSlice";
import { AiOutlineZoomIn } from "react-icons/ai";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const dispatch = useDispatch();
  useEffect(() => {
    getWishlistFromDb();
  }, []);

  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist());
  };
  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);
  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  };
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        {user ? (
          <div className="row">
            {wishlistState && wishlistState === 0 && (
              <div className="text-center fs-3">No Data</div>
            )}
            {wishlistState &&
              wishlistState?.map((item, index) => {
                return (
                  <div className="col-3" key={index}>
                    <div className="wishlist-card position-relative">
                      <img
                        onClick={() => {
                          removeFromWishlist(item?._id);
                        }}
                        src="Images/cross.jpeg"
                        alt="cross"
                        style={{ width: "30px" }}
                        className="position-absolute cross img-fluid"
                      />
                      <div className="wishlist-card-image bg-white">
                      <div className="action-bar position-absolute">
                
                  <Link
                    to={"/product/" + item._id}
                    className="border-0 bg-transparent"
                  >
                    <AiOutlineZoomIn className="fs-4" style={{color:"black",marginRight:"40px"}}/>
                  </Link>
                
              </div>
                        <img
                          src={
                            item?.images
                              ? item?.images[0]?.url
                              : "Images/moisturizer.jpeg"
                          }
                          alt="moisturizer"
                          width={160}
                          className="img-fluid d-block mx-auto"
                        />
                      </div>
                   
                      <div className="py-3 px-3">
                        <h5 className="title">{item?.title}</h5>
                        <h6 className="price"> Rs. {item?.price} PKR</h6>
                      </div>
                    </div>
                  </div>
                  
                );
              })}
          </div>
        ) : (
          <div className="text-center fs-3 h-100vh">
            <h2>Please login to see your wishlist</h2>
          </div>
        )}
      </Container>
    </>
  );
};

export default Wishlist;
