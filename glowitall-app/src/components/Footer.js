import React from "react";
import { Link } from "react-router-dom";
import { BsWhatsapp, BsFacebook, BsInstagram } from "react-icons/bs";
import { MdUnsubscribe } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <div className="d-flex align-items-center gap-15 ">
                  <a
                    className="text-white"
                    href="https://www.facebook.com/profile.php?id=100094534204093&mibextid=ZbWKwL
"
                  >
                    <BsFacebook className="fs-4" />
                  </a>
                  <a
                    className="text-white"
                    href="https://chat.whatsapp.com/Bjo6Fuhajx9A8qjxTIlzKo"
                  >
                    <BsWhatsapp className="fs-4" />
                  </a>
                  <a
                    className="text-white"
                    href="https://instagram.com/glo_witall?igshid=MzNlNGNkZWQ4Mg=="
                  >
                    <BsInstagram className="fs-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-3">
              <h4 className="text-white mb-4">Collection</h4>
              <div className="footer-link d-flex flex-column">
                <Link
                  to="/Start-skincare"
                  className="text-white py-1 mb-1 "
                  style={{ textDecoration: "none" }}
                >
                  Beauty studio{" "}
                </Link>
                <Link
                  to="/Shop-All"
                  className="text-white py-1 mb-1 "
                  style={{ textDecoration: "none" }}
                >
                  Shop All{" "}
                </Link>
                <Link
                  to="/face-skincare"
                  className="text-white py-1 mb-1"
                  style={{ textDecoration: "none" }}
                >
                  Face{" "}
                </Link>
                <Link
                  to="/eyes-skincare"
                  className="text-white py-1 mb-1"
                  style={{ textDecoration: "none" }}
                >
                  Eyes{" "}
                </Link>
              </div>
            </div>

            <div className="col-3">
              <div
                className="footer-link d-flex flex-column"
                style={{ marginTop: "53px" }}
              >
                <Link
                  to="/lips-skincare"
                  className="text-white py-1 mb-1"
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  Lips
                </Link>
                <Link
                  to="/body"
                  className="text-white py-1 mb-1 "
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  Body
                </Link>
                <Link
                  to="/blog"
                  className="text-white py-1 mb-1"
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  Blogs
                </Link>
                
              </div>
            </div>

            <div className="col-3">
              <h4 className="text-white mb-4">About Us</h4>
              <div className="footer-link d-flex flex-column">
                <p className="text-white">
                  Beauty for Each Individual To be the first choice of women
                  seeking conscious free products.
                </p>
                <Link
                  to="/About-Us"
                  className="text-white py-2 mb-1"
                  style={{ textDecoration: "none" }}
                >
                  View More...
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()} Powered by GlowItAll
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
