import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { Link } from "react-router-dom";

const StarterPageSkincare = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  return (
    <>
      <Meta title={"Welcome"} />
      <BreadCrumb title="Welcome" />
      <Container class1="cart-wrapper home-wrapper-2 py-1">
        <div className="row">
          <div className="col-12">
            <div className="strip ">
              <h1 className="Start-title ">BEAUTY STUDIO</h1>
            </div>
          </div>
              {user ? (
                <>
                  <div className="button-holder py-2">
                    <Link to="/mascaraquiz">
                    <img
                        src="https://www.sephora.com/contentimages/editorial/GuidedSelling/MascaraQuiz/2018-06-15-lp-mascara-finder-start-page-us-ca-d-slice.jpg"
                        alt="picture"
                        style={{ "width": "800px","height":"600px" }}
                      />
                    </Link>
                  </div>
                </>
              ) : (
                <p className="Start-content py-2 text-dark">
                  Please login to use this feature.
                </p>
              )}
            </div>
            
          
      </Container>
    </>
  );
};

export default StarterPageSkincare;
