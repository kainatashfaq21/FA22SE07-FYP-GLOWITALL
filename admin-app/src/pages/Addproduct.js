import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import {
  TextField,
  Select,
  FormControl,
  Typography,
  InputLabel,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import ReactQuill from "react-quill";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pCategory/pCategorySlice";
import { getColors } from "../features/color/colorSlice";
// import { Select } from "antd";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
import { config } from "../utils/axiosconfig";
import { base_url } from "../utils/base_url";
import RecommendorForm from "./RecommendorForm";

import axios from "axios";
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  ingredients: yup.string().required("Ingredient is Required"),
  price: yup.number().min(0).required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  recommendations: yup.array(),
  productType: yup.string(),
  color: yup.array(),
  quantity: yup.number().min(1),
});

const skinType = ["foundation", "blush"];
const lipsType = ["lipstick"];
const eyesType = ["lash", "mascara"];
const Addproduct = () => {
  const location = useLocation();
  const product = location?.state?.product;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProductType, setShowProductType] = useState(false);
  const [typeOptions, setTypeOptions] = useState(false);
  const [showQuestionare, setShowQuestionare] = useState(false);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);
  const [selectedOptions, setSelectedOptions] = useState(
    product?.recommendations || []
  );
  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  const [color, setColor] = useState([]);
  const [image, setImage] = useState([]);
  const [colorOpt, setColorOpt] = useState([]);
  const [hideColor, setHideColor] = useState(false);
  /*useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    } else if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);*/
  
  useEffect(() => {
    if (colorState) {
      const colorsP = colorState?.map((image) => ({
        label: image.title,
        value: image._id,
      }));
      setColorOpt(colorsP);
    }
  }, [colorState]);
  useEffect(() => {
    if (product) {
      const productimg = product?.images?.map((image) => ({
        public_id: image.public_id,
        url: image.url,
      }));
      const colors = product?.color?.map((color) => ({
        label: color.title,
        value: color._id,
      }));
      setColor(colors);
      setImage(productimg);
    }
  }, [product]);

  const handleDrop = (acceptedFiles) => {
    dispatch(uploadImg(acceptedFiles));
  };

  useEffect(() => {
    const existingImages = imgState.map((image) => ({
      public_id: image.public_id,
      url: image.url,
    }));
    setImage((prevImages) => [...prevImages, ...existingImages]);
  }, [imgState]);

  useEffect(() => {
    formik.values.color = color ? color : "";
    formik.values.images = image;
  }, [color, image]);

  const formik = useFormik({
    initialValues: {
      title: product?.title || "",
      description: product?.description || "",
      ingredients: product?.ingredients || "",
      price: product?.price || 0,
      brand: product?.brand || "",
      category: product?.category || "",
      tags: product?.tags || "",
      color: color || [],
      productType: product?.productType || "",
      quantity: product?.quantity || "",
      images: image || [],
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (!values.category.includes("skincare") && values.color.length <= 0) {
        toast.error("Please select the Color");
        return;
      }
      if (!values.category.includes("lash") && values.color.length <= 0) {
        toast.error("Please select the Color");
        return;
      }
      if (product) {
        const res = await axios.put(
          `${base_url}product/${product._id}`,
          values,
          config
        );
        if (res.data.status == 200) {
          toast.info(res.data.message, { autoClose: 1500 });
          setTimeout(() => {
            window.location.href = "http://localhost:3001/admin/list-product";
          }, 1000);
        } else {
          toast.error(res.data.message, { autoClose: 1500 });
        }
      } else {
        dispatch(createProducts(values));
        if (isSuccess) {
          setTimeout(() => {
            formik.resetForm();
            setImage([]);
            setSelectedOptions([]);
            setColor([]);
            window.location.href = "http://localhost:3001/admin/list-product";
          }, 1000);
        }
      }
    },
  });
  const [desc, setDesc] = useState();
  const [ingr, setIngr] = useState();
  const handledesc = (e) => {
    setDesc(e);
  };

  const handleingr = (e) => {
    setIngr(e);
  };

  useEffect(() => {
    formik.values.recommendations = selectedOptions;
  }, [selectedOptions]);
  useEffect(() => {
    if (formik.values.category.includes("face makeup")) {
      setShowProductType(true);
      setTypeOptions(skinType);
    } else if (formik.values.category.includes("eyes makeup")) {
      setTypeOptions(eyesType);
      setShowProductType(true);
    } else if (formik.values.category.includes("lips makeup")) {
      setTypeOptions(lipsType);
      setShowProductType(true);
    } else {
      setShowProductType(false);
    }
  }, [formik.values.category]);
  useEffect(() => {
    const type = formik.values.category;
    if (
      type.includes("face makeup") ||
      type.includes("eyes makeup") ||
      type.includes("lips makeup") ||
      type.includes("face skincare") ||
      type.includes("eyes skincare") ||
      type.includes("lips skincare") 
    ) {
      setShowQuestionare(true);
    } else {
      setShowQuestionare(false);
    }
    if (type.includes("skincare")) {
      setHideColor(true);
    } else {
      setHideColor(false);
    }
  }, [formik.values.category]);

  const handleColors = (selectedOptions) => {
    setColor(selectedOptions);
  };
  const handleSelectedOptions = (options) => {
    setSelectedOptions(options);
  };
  const handleDeleteImage = (publicId) => {
    dispatch(deleteImg(publicId));

    const imgs = image.filter((image) => image.public_id !== publicId);
    setImage(imgs);
  };

  /*        =============consoles====================             */

  // console.log("=========>product state", product);
  // console.log("=========> color opt", colorOpt);
  // console.log("=========>color state", colorState);
  // console.log("===========>", color);

  return (
    <div>
      {product ? (
        <h3 className="mb-4 title">Update Product</h3>
      ) : (
        <h3 className="mb-4 title">Add Product</h3>
      )}

      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <Typography variant="h6" component="h6">
            Enter Product title
          </Typography>
          <TextField
            type="text"
            label="Title"
            name="title"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <FormControl fullWidth>
            <Typography variant="h6" component="h6">
              Enter description
            </Typography>
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </FormControl>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <FormControl fullWidth>
            <Typography variant="h6" component="h6">
              Enter Ingredients
            </Typography>
            <ReactQuill
              theme="snow"
              name="ingredients"
              onChange={formik.handleChange("ingredients")}
              value={formik.values.ingredients}
            />
          </FormControl>
          <div className="error">
            {formik.touched.ingredients && formik.errors.ingredients}
          </div>
          <FormControl fullWidth>
            <Typography variant="h6" component="h6">
              Enter Product price
            </Typography>
            <TextField
              type="number"
              label="Price"
              name="price"
              min={0}
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              inputMode="decimal"
            />
          </FormControl>
          <Typography variant="h6" component="h6">
            Enter product brand
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="brand-label">Select Brand</InputLabel>

            <Select
              name="brand"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.brand}
              labelId="brand-label"
              id="category"
              size="small"
              className="form-control"
              helperText={formik.touched.brand && formik.errors.brand}
            >
              <MenuItem value="" disabled>
                Select Brand
              </MenuItem>
              {brandState.map((i, j) => (
                <MenuItem key={j} value={i.title}>
                  {i.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="h6" component="h6">
            Select product category
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="category-label">Select Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              size="small"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
              helperText={formik.touched.category && formik.errors.category}
            >
              {catState.map((i, j) => (
                <MenuItem key={j} value={i.title}>
                  {i.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {showProductType && (
            <>
              <Typography variant="h6" component="h6">
                Select product type
              </Typography>

              <FormControl fullWidth>
                <InputLabel id="product-type">Select Product Type</InputLabel>
                <Select
                  labelId="product-type"
                  id="productType"
                  size="small"
                  name="Product Type"
                  value={formik.values.productType}
                  onChange={formik.handleChange("productType")}
                  onBlur={formik.handleBlur("productType")}
                  className="form-control"
                  helperText={
                    formik.touched.productType && formik.errors.productType
                  }
                >
                  <MenuItem value="" disabled>
                    Select type
                  </MenuItem>
                  {typeOptions.map((i, j) => (
                    <MenuItem key={j} value={i}>
                      {i}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
          {showQuestionare && (
            <>
              <div>
                <RecommendorForm
                  selectedOption={handleSelectedOptions}
                  productType={formik.values.productType}
                  defaultvalue={selectedOptions}
                  category={formik.values.category}
                />
              </div>

              <Typography variant="h6" component="h6">
                Selected recommendations
              </Typography>
              <TextField
                type="text"
                label="Recommendations"
                name="recommendations"
                variant="outlined"
                disabled={true}
                className="form-control"
                value={selectedOptions.join(", ")}
              />
            </>
          )}
          <Typography variant="h6" component="h6">
            Select product tags
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="tags-label">Select Tags</InputLabel>
            <Select
              labelId="tags-label"
              id="tags"
              name="tags"
              size="small"
              value={formik.values.tags}
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.tags && formik.errors.tags}
            >
              <MenuItem value="featured">Featured</MenuItem>
              <MenuItem value="popular">Popular</MenuItem>
              <MenuItem value="special">Special</MenuItem>
            </Select>
          </FormControl>
          {!hideColor == true && (
            <>
              <Typography variant="h6" component="h6">
                Select Colors
              </Typography>
              <Autocomplete
                multiple
                fullWidth
                options={colorOpt.filter(
                  (option) => !color.includes(option.value)
                )}
                value={color}
                onChange={(event, value) => handleColors(value)}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Colors"
                    placeholder="Select colors"
                  />
                )}
                renderOption={(props, option, { selected }) => (
                  <li
                    {...props}
                    style={{
                      backgroundColor: !selected ? option.label : "transparent",
                    }}
                  >
                    {option.label}
                  </li>
                )}
              />
              <div className="error">
                {formik.touched.color && formik.errors.color}
              </div>
            </>
          )}

          <Typography variant="h6" component="h6">
            Enter product Quantity
          </Typography>
          <TextField
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            min={1}
            value={formik.values.quantity}
            className="form-control"
            helperText={formik.touched.quantity && formik.errors.quantity}
          />

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {image?.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(i.public_id)}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {!product ? "Add Product" : "Update product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
