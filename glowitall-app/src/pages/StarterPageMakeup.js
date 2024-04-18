import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { Link } from "react-router-dom";

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const StarterPageMakeup = () => {
  return (
    <>
      <Meta title={"Welcome"} />
      <BreadCrumb title="Welcome" />
      <Container class1="cart-wrapper home-wrapper-2 py-1">
        <div className="row">
          <div className="col-12">
            <div className="strip ">
              <h1 className="Start-title">BEAUTY STUDIO</h1>
            </div>
          </div>
          <div className="content py-4">
            <div className="col-7 text-content-makeup">
              <h3 className="Start-content py-2">MAKEUP FINDER</h3>
              {user ? (
                <>
                  <h4 className="Start-content py-2">
                    What are you looking for?
                  </h4>
                  <div className="makeup-links">
                    <Link to="/Start-foundation" className="makeup-start py-1">
                      Foundation Finder
                    </Link>
                    <br />
                    <Link to="/Start-mascara" className="makeup-start py-1">
                      Mascara Finder
                    </Link>
                    <br />
                    <Link to="/Start-lipstick" className="makeup-start py-1">
                      Lipstick Finder
                    </Link>
                    <br />
                    <Link to="/Start-blush" className="makeup-start py-1">
                      Blush Finder
                    </Link>
                    <br />
                    <Link to="/Start-lash" className="makeup-start py-1">
                      Lash Finder
                    </Link>
                  </div>
                </>
              ) : (
                <p className="Start-content py-2">
                  Please login to use this feature.
                </p>
              )}
            </div>
            <div className="col-5">
              <img
                src="https://img.freepik.com/free-photo/top-view-arrangement-with-beauty-bag-copy-space_23-2148301851.jpg?size=338&ext=jpg&ga=GA1.2.1708761850.1679736585&semt=sph"
                alt="picture"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default StarterPageMakeup;
