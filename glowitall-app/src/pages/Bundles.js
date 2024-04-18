import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import BundleCard from "../components/BundleCard";
import Container from "../components/Container";
import {TfiLayoutColumn4} from 'react-icons/tfi';
import {TfiLayoutColumn3} from 'react-icons/tfi'; 
import {TfiLayoutColumn2} from 'react-icons/tfi';  
import { Link } from "react-router-dom"; 


const Bundles = () => {

  const [grid, setGrid] = useState(3);

  return (
    <>
      <Meta title={"Bundles"} />
      <BreadCrumb title="Bundles" />

      <Container class1="store-wrapper home-wrapper-2 py-1">
          <div className="row">
            <div className="col-12">
            <div className="mb-2">
              <img src="Images/bundles.jpg" alt="Bundles" style={{width:"100%"}}/>
            </div>
            </div>
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Categories</h3>
                <div>
                  <ul className="ps-0">
                  <li> <Link to="/"  style={{textDecoration:"none" ,color:"var(--color-777777)"}}>Shop by All</Link></li>
                    <li> <Link to="/Eyes-makeup"  style={{textDecoration:"none" ,color:"var(--color-777777)"}}>Eyes</Link></li>
                    <li> <Link to="/Face-makeup"  style={{textDecoration:"none" ,color:"var(--color-777777)"}}>Face</Link></li>
                    <li> <Link to="/lips-makeup"  style={{textDecoration:"none" ,color:"var(--color-777777)"}}>Lips</Link></li>
                  </ul>
                </div>
              </div>

              
        <div className="filter-card mb-3">
          <h3 className="filter-title">Product Tags</h3>
          <div>
            <div className="product-tags d-flex flex-wrap align-items-center gap-10">
              <span className="badge bg-light text-secondary rounded-3 py-2 px-3">Eye Liner</span>
              <span className="badge bg-light text-secondary rounded-3 py-2 px-3">Eye Lashes</span>
              <span className="badge bg-light text-secondary rounded-3 py-2 px-3">Lip Liner</span>
              <span className="badge bg-light text-secondary rounded-3 py-2 px-3">Lip Gloss</span>
              <span className="badge bg-light text-secondary rounded-3 py-2 px-3">Cream</span>
              <span className="badge bg-light text-secondary rounded-3 py-2 px-3">Scrub</span>

            </div>
          </div>
        </div>

        <div className="filter-card mb-3">
        <h3 className="filter-title"> Random Products </h3>

        <div>
          <div className="random-products mb-3 d-flex gap-10">
            <div className="w-50">
              <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGV5ZXMlMjBtYWtldXB8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" className="img-fluid" alt="Lipstick" />
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
              <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGV5ZXMlMjBtYWtldXB8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" className="img-fluid" alt="Lipstick" />
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
      <div className="filter-sort-grid mb-4">
       <div className="d-flex justify-content-between align-items-center">
       <div className="d-flex align-items-center gap-10"> 
          <p className="mb-0" style={{"width" : "100px"}}>Sort By:</p>
            <select name=""  defaultValue={"manual"}className="form-control form-select " id="">
              
              <option value="manual">Featured</option> 
              <option value="best-selling" >Best selling </option>
              <option value="title-ascending">Alphabetically, A-Z</option>
              <option value="title-descending"> Alphabetically, Z-A </option>
              <option value="price-ascending">Price, low to high</option>
              <option value="price-descending">Price, high to low</option>
              <option value="created-ascending">Date, old to new</option>
              <option value="created-descending">Date, new to old</option>
             </select>
            </div>
            <div className="d-flex align-items-center gap-10"> 
              <p className="totalproducts mb-0">21 Products</p> 
                <div className="d-flex gap-10 align-items-center grid">
              <button className="border-0 bg-transparent">
                <TfiLayoutColumn4 onClick={() => {setGrid(3);}}/>
              </button>
              <button className="border-0 bg-transparent">
              <TfiLayoutColumn3 onClick={() => {setGrid(4);}}/>
              </button>
              <button className="border-0 bg-transparent">
              <TfiLayoutColumn2 onClick={() => {setGrid(6);}}/>
              </button>
              </div> 
              </div>
              </div>
          </div>

          <div className="products-list pb-5">
            <div className="d-flex flex-wrap gap-10">
            <BundleCard grid={grid} />
            </div> 
          </div>
        </div>
    </div>
  </Container>
    </>
  );
};

export default Bundles;
