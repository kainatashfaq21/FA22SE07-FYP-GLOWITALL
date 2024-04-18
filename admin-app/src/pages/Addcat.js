import React, { useEffect } from "react";
import {
  TextField,
  Select,
  FormControl,
  Typography,
  InputLabel,
  Autocomplete,
  MenuItem,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createCategory,
  getAProductCategory,
  updateAProductCategory,
  resetState,
} from "../features/pCategory/pCategorySlice";

const schema = Yup.object().shape({
  title: Yup.string().required("Category Name is Required"),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  console.log("params", params, id);
  const getPCatId = location.pathname.split("/")[3];
  console.log(getPCatId);
  const newCategory = useSelector((state) => state.pCategory);
  console.log(newCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    updatedCategory,
    categoryName,
  } = newCategory;
  // console.log(categoryName);

  useEffect(() => {
    if (getPCatId !== undefined) {
      dispatch(getAProductCategory(id));
    } else {
      dispatch(resetState());
    }
  }, [getPCatId]);

  // useEffect(() => {
  //   if (isSuccess && createdCategory) {
  //     toast.success("Categories added successfully!");
  //   }
  //   if (isSuccess && updatedCategory) {
  //     toast.success("Category Updated successfully!");
  //   }
  //   if (isError) {
  //     toast.error("Something went wrong!");
  //   }
  // }, [isSuccess, isError, isLoading, createdCategory]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPCatId !== undefined) {
        const data = { id: getPCatId, pCatData: values };
        dispatch(updateAProductCategory(data));
        formik.resetForm();
        toast.success("Category Updated successfully!");
        dispatch(resetState());
        navigate("/admin/list-category");
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        toast.success("Categories added successfully!");
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getPCatId !== undefined ? "Edit" : "Add"} Category
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            type="text"
            label="Enter Product Category"
            id="category"
            onChange={(event) =>
              formik.handleChange("title")(event.target.value.toLowerCase())
            }
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
            error={formik.touched.title && formik.errors.title}
            helperText={formik.touched.title && formik.errors.title}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              className="my-5"
              type="submit"
            >
              {getPCatId !== undefined ? "Edit" : "Add"} Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
