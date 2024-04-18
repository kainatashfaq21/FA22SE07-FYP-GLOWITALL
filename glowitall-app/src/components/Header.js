/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { NavLink, Link, useNavigate, Navigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BiGitCompare } from "react-icons/bi";
import { HiOutlineHeart } from "react-icons/hi";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoMdLogIn } from "react-icons/io";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../features/products/productSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state?.auth);
  const pro = useSelector((state) => state?.product?.product);
  const productState = pro.products;
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  // const [profilePicture, setProfilePicture] = useState(userState?.profilePicture);
  const [paginate, setPaginate] = useState(true);
  const [total, setTotal] = useState(null);
  const [productOpt, setProductOpt] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum =
        sum +
        Number(cartState[index].quantity) * Number(cartState[index].price);
      setTotal(sum);
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/"; // Navigate to the home page
  };

  return (
    <>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-3  d-flex gap-10">
              <img
                src=" Images/logo.jpg"
                alt="image"
                style={{ width: "60px", height: "60px", borderRadius: "50%" }}
              />
              <h2 style={{marginTop:"10px"}}>
                <Link to="/home" className="text-dark" style={{ textDecoration: "none" }}>
                  Glow It All
                </Link>
              </h2>
            </div>

            <div className="col-4">
              <div className="input-group">
                <div id="search-autocomplete" className="form-outline">
                <Typeahead
                id="pagination-example"
                onPaginate={() => console.log('Results paginated')}
                onChange={(selected)=>{navigate(`/product/${selected[0]?.prod}`)
                dispatch(getAProduct(selected[0]?.prod))
                }}
                options={productOpt}
                minLength={2}
                paginate={paginate}
                labelKey={"name"}
                placeholder="Search for products here..."
              />
                </div>
                <button type="button" className="search-btn">
                  <BsSearch />
                </button>
              </div>
            </div>
           
            {/* <div className=" d-flex justify-content-center"></div> */}

            <div className="col-5 d-flex justify-content-end">
              <div className="header-upper-icons d-flex align-items-center gap-20">
                <Link
                  to="/wishlist"
                  className="d-flex align-items-center gap-10 text-dark"
                  style={{ textDecoration: "none" }}
                >
                  <HiOutlineHeart className="fs-4" />
                  
                </Link>
                <Link
                  to="/cart"
                  className="d-flex align-items-center gap-10 text-dark"
                  style={{ textDecoration: "none" }}
                >
                  <BsCartPlus className="fs-4" />
                
                </Link>

                <Link
                  to={authState?.user === null ? "/login" : ""}
                  className="d-flex align-items-center gap-10 text-dark"
                  style={{ textDecoration: "none" }}
                >
                  <IoMdLogIn className="fs-4" />
                  {authState?.user === null ? (
                    <p className="mb-0">Login </p>
                  ) : (
                    <p className="mb-0">Welcome {user?.firstname}</p>
                  )}
                </Link>
                {authState?.user ? (
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle border-0 text-dark"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={
                          user
                            ? user?.profile
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </button>

                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <NavLink className="dropdown-item" to="/my-profile">
                          My Profile
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <p className="mb-0"></p>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-lower bg-dark">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col">
              <nav className="navbar navbar-expand-lg navbar-dark">
              
                <div
                  className={`collapse navbar-collapse ${
                    isMenuOpen ? "show" : ""
                  }`}
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link dropdown-toggle text-white"
                        activeClassName="active"
                        exact
                        to="/"
                        id="homeDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        BEAUTY STUDIO
                      </NavLink>
                      <ul
                        className="dropdown-menu bg-dark"
                        aria-labelledby="homeDropdown"
                      >
                        <li>
                          <NavLink
                            className="dropdown-item text-white"
                            activeClassName="active"
                            exact
                            to="/Start-makeup"
                          >
                            MAKEUP
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item text-white"
                            activeClassName="active"
                            exact
                            to="/Start-skincare"
                          >
                            SKINCARE
                          </NavLink>
                        </li>
                        {/* Add more sub-links as needed */}
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link text-white"
                        activeClassName="active"
                        exact
                        to="/Shop-All"
                        id="homeDropdown"
                        role="button"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        SHOP ALL
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link dropdown-toggle text-white"
                        activeClassName="active"
                        exact
                        to="/"
                        id="homeDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        FACE
                      </NavLink>
                      <ul
                        className="dropdown-menu bg-dark"
                        aria-labelledby="homeDropdown"
                      >
                        <li>
                          <NavLink
                            className="dropdown-item text-white"
                            activeClassName="active"
                            exact
                            to="/face-makeup"
                          >
                            MAKEUP
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item text-white"
                            activeClassName="active"
                            exact
                            to="/face-skincare"
                          >
                            SKINCARE
                          </NavLink>
                        </li>
                        {/* Add more sub-links as needed */}
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link dropdown-toggle text-white"
                        activeClassName="active"
                        exact
                        to="/"
                        id="homeDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        EYES
                      </NavLink>
                      <ul
                        className="dropdown-menu bg-dark"
                        aria-labelledby="homeDropdown"
                      >
                        <li>
                          <NavLink
                            className="dropdown-item text-white"
                            activeClassName="active"
                            exact
                            to="eyes-makeup"
                          >
                            MAKE UP
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item text-white"
                            activeClassName="active"
                            exact
                            to="eyes-skincare"
                          >
                            SKINCARE
                          </NavLink>
                        </li>
                        {/* Add more sub-links as needed */}
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link dropdown-toggle text-white"
                        activeClassName="active"
                        exact
                        to="/"
                        id="homeDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        LIPS
                      </NavLink>
                      <ul
                        className="dropdown-menu bg-dark"
                        aria-labelledby="homeDropdown"
                      >
                        <li>
                          <NavLink
                            className="dropdown-item text-white"
                            activeClassName="active"
                            exact
                            to="lips-makeup"
                          >
                            MAKE UP
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item text-white"
                            activeClassName="active"
                            exact
                            to="lips-skincare"
                          >
                            SKINCARE
                          </NavLink>
                        </li>
                        {/* Add more sub-links as needed */}
                      </ul>
                    </li>
                    {/* <li className="nav-item">
                      <NavLink
                        className="nav-link text-white"
                        activeClassName="active"
                        to="/body"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        BODY
                      </NavLink>
                    </li> */}
                    {/* <li className="nav-item">
                      <NavLink
                        className="nav-link text-white"
                        activeClassName="active"
                        to="/Bundles"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        BUNDLES
                      </NavLink>
                    </li> */}
                    <li className="nav-item">
                      <NavLink
                        className="nav-link  text-white"
                        activeClassName="active"
                        to="/blog"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        BLOGS
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link  text-white"
                        activeClassName="active"
                        to="/my-orders"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        MY ORDERS
                      </NavLink>
                    </li>
                    {/* {showSearch ? (
                      <div className="input-group">
                        <div id="search-autocomplete" className="form-outline">
                          <Typeahead
                            id="pagination-example"
                            onPaginate={() => console.log("Results paginated")}
                            onChange={(selected) => {
                              navigate(`/product/${selected[0]?.prod}`);
                              dispatch(getAProduct(selected[0]?.prod));
                            }}
                            options={productOpt}
                            minLength={2}
                            paginate={paginate}
                            labelKey={"name"}
                            placeholder="Search for products here..."
                          />
                        </div>
                        <button
                          type="button"
                          className="search-btn"
                          onClick={toggleSearch}
                        >
                          <BsSearch />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="search-btn"
                        onClick={toggleSearch}
                      >
                        <BsSearch />
                      </button>
                    )} */}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* </div>{" "} */}
    </>
  );
};

export default Header;

