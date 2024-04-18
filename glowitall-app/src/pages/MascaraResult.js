import React, { useState } from "react";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import MakeupCard from "../components/FaceMakeupCard";
import Container from "../components/Container";

const MascaraResult = () => {
  const [grid, setGrid] = useState(3);
  const data = [
    {
      _id: 1,
      brand: "Brand 1",
      title: "Product 1",
      images: [
        {
          url: "https://dummyimage.com/500x500",
        },
      ],
      totalrating: 4,
      price: 20,
      description: "Product 1 description",
    },
    {
      _id: 2,
      brand: "Brand 2",
      title: "Product 2",
      images: [
        {
          url: "https://dummyimage.com/500x500",
        },
      ],
      totalrating: 3,
      price: 25,
      description: "Product 2 description",
    },

  ];

  return (
    <>
      <Meta title={"Result"} />

      <Container class1="store-wrapper home-wrapper-2 py-2 ">
        <div className="row">
          <div className="col-12">
            <div className="col-12">
              <div className="strip ">
                <h1 className="Start-title">BEAUTY STUDIO</h1>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="filter-card  mt-3">
              <h3 className="filter-title"> Random Products </h3>

              <div>
                <div className="random-products mb-3 d-flex gap-10">
                  <div className="w-50">
                    <img
                      src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1ha2V1cHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                      className="img-fluid"
                      alt="Lipstick"
                    />
                  </div>
                  <div className="w-50">
                    <h5>Lorem Ipsum is simply dummy text. </h5>
                    <ReactStars
                      count={5}
                      value="3"
                      edit={false}
                      size={15}
                      activeColor="#ffd700"
                    />
                    <p>$200</p>
                  </div>
                </div>

                <div className="random-products d-flex gap-10">
                  <div className="w-50">
                    <img
                      src="https://st4.depositphotos.com/13349494/38194/i/600/depositphotos_381945002-stock-photo-top-view-eye-shadow-blush.jpg"
                      className="img-fluid"
                      alt="Lipstick"
                    />
                  </div>
                  <div className="w-50">
                    <h5>Lorem Ipsum is simply dummy text. </h5>
                    <ReactStars
                      count={5}
                      value="3"
                      edit={false}
                      size={15}
                      activeColor="#ffd700"
                    />
                    <p>$200</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <h5 style={{ marginLeft: "270px", marginTop: "20px" }}>
              Your personalized Mascaras!
            </h5>
            <div className="products-list pb-5 mt-3">
              <div className="d-flex flex-wrap gap-10">
                <MakeupCard data={data} grid={grid} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MascaraResult;
