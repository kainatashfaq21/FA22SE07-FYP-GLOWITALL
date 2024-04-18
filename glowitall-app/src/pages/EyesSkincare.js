import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { TfiLayoutColumn4 } from "react-icons/tfi";
import { TfiLayoutColumn3 } from "react-icons/tfi";
import { TfiLayoutColumn2 } from "react-icons/tfi";
import FaceMakeupCard from "../components/FaceMakeupCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";

const EyesSkincare = () => {
  const pro = useSelector((state) => state?.product?.product);
  const productState = pro.products;
  console.log(productState, "================");
  console.log(productState);
  const [grid, setGrid] = useState(3);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState(null);
  const [tag, setTag] = useState(null);
  const [brand, setBrand] = useState(null);
  const [sort, setSort] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const totalProducts = pro.totalProducts;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  console.log(totalPages);
  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newtags = [];
    if (productState) {
      for (let index = 0; index < productState.length; index++) {
        const element = productState[index];
        newBrands.push(element.brand);
        category.push(element.category);
        newtags.push(element.tags);
      }
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newtags);
  }, [productState]);
  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, currentPage]);

  const dispatch = useDispatch();
  const clearCategory = () => {
    setCategory(null);
  };

  const clearTag = () => {
    setTag(null);
  };

  const clearBrand = () => {
    setBrand(null);
  };
  const getProducts = async () => {
    try {
      await dispatch(
        getAllProducts({
          sort,
          tag,
          brand,
          category: "eyes skincare",
          page: currentPage,
          perPage: productsPerPage,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  console.log(currentPage);
  console.log(productsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log(
    [...new Set(brands)],
    [...new Set(categories)],
    [...new Set(tag)]
  );
  console.log(sort);

  return (
    <>
      <Meta title={"Shop All"} />
      <BreadCrumb title="Shop All" />

      <Container class1="store-wrapper home-wrapper-2 py-1">
        <div className="row">
        <div className="col-12">
            <div className="mb-2">
              <img
                src="https://cdn.shopify.com/s/files/1/0619/8948/6798/collections/Categories_eye_wonder.jpg?v=1676541598&width=1500"
                alt="Eyes"
                style={{ width: "100%" , height:"400px" }}
              />
            </div>
          </div>
          <div className="col-12 col-md-3 d-flex flex-column">
            <div className="filter-card mb-3">
              <h3 className="filter-title">
                Shop By Categories
                {category && (
                  <div className="reset-filter">
                    <span onClick={clearCategory}>X</span>
                  </div>
                )}
              </h3>
              <div className="filter-content">
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {categories &&
                    [...new Set(categories)].map((item, index) => {
                      return (
                        <span
                          onClick={() => setCategory(item)}
                          key={index}
                          className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3"
                        >
                          {item}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="filter-card mb-3">
              <h3 className="filter-title">
                Product Tags
                {tag && (
                  <span className="reset-filter" onClick={clearTag}>
                    X
                  </span>
                )}
              </h3>
              <div className="filter-content">
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {tags &&
                    [...new Set(tags)].map((item, index) => {
                      return (
                        <span
                          onClick={() => setTag(item)}
                          key={index}
                          className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3"
                        >
                          {item}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="filter-card mb-3">
              <h3 className="filter-title">
                Product Brands
                {brand && (
                  <span className="reset-filter" onClick={clearBrand}>
                    X
                  </span>
                )}
              </h3>
              <div className="filter-content">
                <div className="product-brands d-flex flex-wrap align-items-center gap-10">
                  {brands &&
                    [...new Set(brands)].map((item, index) => {
                      return (
                        <span
                          onClick={() => setBrand(item)}
                          key={index}
                          className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3"
                        >
                          {item}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    name=""
                    defaultValue={"manual"}
                    className="form-control form-select"
                    id=""
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="manual">Manual</option>
                    <option value="brand">Alphabetically, A-Z</option>
                    <option value="-brand">Alphabetically, Z-A</option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">
                    {pro?.totalProducts} Products
                  </p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <button className="border-0 bg-transparent">
                      <TfiLayoutColumn4
                        onClick={() => {
                          setGrid(3);
                        }}
                      />
                    </button>
                    <button className="border-0 bg-transparent">
                      <TfiLayoutColumn3
                        onClick={() => {
                          setGrid(4);
                        }}
                      />
                    </button>
                    <button className="border-0 bg-transparent">
                      <TfiLayoutColumn2
                        onClick={() => {
                          setGrid(6);
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="products-list pb-5">
              <div className="d-flex flex-wrap gap-10">
                <FaceMakeupCard
                  data={productState ? productState : []}
                  u
                  grid={grid}
                />
              </div>
              <div
                className="pagination"
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    style={{
                      padding: "5px 10px",
                      margin: "0 2px",
                      borderRadius: "3px",
                      border: "1px solid #ccc",
                      backgroundColor:
                        pageNumber === currentPage ? "#e0e0e0" : "#fff",
                      color: "#000",
                      cursor: "pointer",
                    }}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default EyesSkincare;
