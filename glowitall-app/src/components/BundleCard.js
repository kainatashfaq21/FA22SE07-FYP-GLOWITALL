import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import {HiOutlineHeart} from "react-icons/hi";
import {BiGitCompare} from "react-icons/bi";
import {AiOutlineZoomIn} from "react-icons/ai";
import {BsCartPlus} from "react-icons/bs";
//can import images by name and then pass below in img src can be done in multiple files

const BundleCard = (props) => {
  
  const {grid} = props;
  console.log(grid);
  let location = useLocation();

  return (
   <>
     <div className={` ${location.pathname === "/store" ? `gr-${grid}` : "col-3"}`}>
      <Link to = "/product/:id" className="product-card position-relative"> 
        <div className="whishlist-icon  position-absolute">
          
          <button className="border-0 bg-transparent">
          <HiOutlineHeart className="fs-4" />
          </button>
        </div>

        <div className="product-image">
          <img
            src="https://vader-prod.s3.amazonaws.com/1635350864-screen-shot-2021-10-27-at-12-07-13-pm-1635350849.png"
            className="img-fluid w-100 h-100"
            alt="product"
           
          />
          <img
            src="https://images.ctfassets.net/wlke2cbybljx/vDI63Bi9BRNacXrM86kUa/56012fd7138ce9cd14710ac3f07cf3f4/PT_DREAMS_COME_TRUE_NOPACKAGING.png?w=500&h=500&fit=fill&fm=jpg&bg="
            className="img-fluid w-100 h-100"
            alt="product"
            width="250px"
          />
        </div>
        <div className="product-details">
          <h6 className="brand">Charlotte Tilbury</h6>
          <p className=" product-title">
            A best selling Gift Set with enchanting range of products for every occasion
          </p>
          <ReactStars
            count={5}
            value="3"
            edit={false}
            size={24}
            activeColor="#ffd700"
          />
          <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}> 
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
          <p>
            <div className="price">$50.00</div>
          </p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-10">
            <button className="border-0 bg-transparent">
            <BiGitCompare className="fs-4"/>
            </button>
            <button className="border-0 bg-transparent">
            <AiOutlineZoomIn className="fs-4"/>
            </button>
            <button className="border-0 bg-transparent">
            <BsCartPlus className="fs-4"/>
            </button>
          </div>
        </div>
      </Link>
    </div>

    <div className={` ${location.pathname === "/store" ? `gr-${grid}` : "col-3"}`}>
      <div className="product-card position-relative"> 
      <div className="whishlist-icon  position-absolute">
          
          <button className="border-0 bg-transparent">
          <HiOutlineHeart className="fs-4" />
          </button>
        </div>


        <div className="product-image">
          <img
            src="https://i.pinimg.com/736x/e5/50/71/e550712159385a85df2cac83cfe27f62.jpg"
            className="img-fluid w-100 h-100"
            alt="product"
            width="250px"
          />
          <img
            src="https://www.spacenk.com/dw/image/v2/ABCE_PRD/on/demandware.static/-/Sites-spacenkmastercatalog/default/dw19d1a87f/products/RARE/UK200033077_RARE.jpg?sw=582&sh=582"
            className="img-fluid w-100 h-100"
            alt="product"

            
          />
        </div>
        <div className="product-details">
          <h6 className="brand" style={{textDecoration:"none"}}>Rare Beauty</h6>
          <p className=" product-title">
             A lips GiftSet with creamy full coverage lip glosses with hydration
          </p>
          <ReactStars
            count={5}
            value="3"
            edit={false}
            size={24}
            activeColor="#ffd700"
          />
          <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}> 
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
          <p>
            <div className="price">$50.00</div>
          </p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-10">
            <button className="border-0 bg-transparent">
            <BiGitCompare className="fs-4"/>
            </button>
            <button className="border-0 bg-transparent">
            <AiOutlineZoomIn className="fs-4"/>
            </button>
            <button className="border-0 bg-transparent">
            <BsCartPlus className="fs-4"/>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div className={` ${location.pathname === "/store" ? `gr-${grid}` : "col-3"}`}>
      <Link to = "/product/:id" className="product-card position-relative"> 
        <div className="whishlist-icon  position-absolute">
          
          <button className="border-0 bg-transparent">
          <HiOutlineHeart className="fs-4" />
          </button>
        </div>

        <div className="product-image">
          <img
            src="https://feelunique.com/cdn-cgi/image/quality=70,format=auto,metadata=none,dpr=1/img/products/170270/sub-products/huda_beauty_the_ultimate_bombshell_lip-78563-variant-1671783536_listing.jpg"
            className="img-fluid w-100 h-100"
            alt="product"
           
          />
          <img
            src="https://hudabeauty.com/dw/image/v2/BCNC_PRD/on/demandware.static/-/Sites-huda-master-catalog/default/dw3795cca6/images/Ultimate_Lip_Trio_Jan_2023/HB-LipKitTrio-Stylized-0231.jpg?sw=1242&sh=1242&sm=fit"
            className="img-fluid w-100 h-100"
            alt="product"
            width="250px"
          />
        </div>
        <div className="product-details">
          <h6 className="brand">Huda Beauty</h6>
          <p className=" product-title">
            A lips Bundle Set with creamy full coverage lipstick, lip pencil and lip gloss
          </p>
          <ReactStars
            count={5}
            value="3"
            edit={false}
            size={24}
            activeColor="#ffd700"
          />
          <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}> 
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
          <p>
            <div className="price">$50.00</div>
          </p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-10">
            <button className="border-0 bg-transparent">
            <BiGitCompare className="fs-4"/>
            </button>
            <button className="border-0 bg-transparent">
            <AiOutlineZoomIn className="fs-4"/>
            </button>
            <button className="border-0 bg-transparent">
            <BsCartPlus className="fs-4"/>
            </button>
          </div>
        </div>
      </Link>
    </div>

    <div className={` ${location.pathname === "/store" ? `gr-${grid}` : "col-3"}`}>
      <Link to = "/product/:id" className="product-card position-relative"> 
        <div className="whishlist-icon  position-absolute">
          
          <button className="border-0 bg-transparent">
          <HiOutlineHeart className="fs-4" />
          </button>
        </div>

        <div className="product-image">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQea-OesrZUfovNfa__Tss_mjL6kf78kgcWO6J0Ogoeqqj7mP3UCY36jQbloHR1sHZTz-s&usqp=CAU"
            className="img-fluid w-100 h-100"
            alt="product"
           
          />
          <img
            src="https://m.media-amazon.com/images/I/819vjJEzKBL._SL1500_.jpg"
            className="img-fluid w-100 h-100"
            alt="product"
            width="250px"
          />
        </div>
        <div className="product-details">
          <h6 className="brand">Essence</h6>
          <p className=" product-title">
            Lash Princess Gift Set that gives you an instant false lash look for all-day wear
          </p>
          <ReactStars
            count={5}
            value="3"
            edit={false}
            size={24}
            activeColor="#ffd700"
          />
          <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}> 
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
          <p>
            <div className="price">$50.00</div>
          </p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-10">
            <button className="border-0 bg-transparent">
            <BiGitCompare className="fs-4"/>
            </button>
            <button className="border-0 bg-transparent">
            <AiOutlineZoomIn className="fs-4"/>
            </button>
            <button className="border-0 bg-transparent">
            <BsCartPlus className="fs-4"/>
            </button>
          </div>
        </div>
      </Link>
    </div>


   </>
  );
};
export default BundleCard ;
