import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  Select,
  FormControl,
  Typography,
  InputLabel,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createNewblogCat,
  getABlogCat,
  resetState,
  updateABlogCat,
} from "../features/bCategory/bCategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.bCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createBlogCategory,
    blogCatName,
    updatedBlogCategory,
  } = newBlogCategory;

  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getABlogCat(getBlogCatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId]);

  useEffect(() => {
    if (isSuccess && updatedBlogCategory) {
      toast.success("Blog Category Updated Successfullly!");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      const data = { id: getBlogCatId, blogCatData: values };
      if (getBlogCatId !== undefined) {
        dispatch(updateABlogCat(data));
        dispatch(resetState());
        setTimeout(() => {

          toast.success("Blog Category Updated Successfullly!");
          // navigate("/admin/blog-category-list");
        }, 300);
      } else {
        console.log("values", values);
        dispatch(createNewblogCat(values));
        formik.resetForm();
        toast.success("Blog Category Added Successfullly!");
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <TextField
            type="text"
            label="Enter Blog Category Title"
            name="title"
            className="form-control"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
            fullWidth
            helperText={formik.touched.title && formik.errors.title}
          />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcat;