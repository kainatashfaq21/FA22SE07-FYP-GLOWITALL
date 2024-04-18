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
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createBrand,
  getABrand,
  resetState,
  updateBrand,
} from "../features/brand/brandSlice";

let schema = yup.object().shape({
  title: yup.string().required("Brand Name is Required"),
});

const Addbrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  console.log(newBrand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand added successfully!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated successfully!");
      navigate("/admin/list-brand");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBrand]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateBrand(data));
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBrandId !== undefined ? "Edit" : "Add"} Brand
      </h3>
      <div>
        <div>
          <form action="" onSubmit={formik.handleSubmit}>
            <TextField
              type="text"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              label="Enter Brand"
              id="brand"
              helperText={formik.touched.title && formik.errors.title}
            />

            <div>
              <Button
                variant="contained"
                color="primary"
                className="my-5"
                type="submit"
              >
                {getBrandId !== undefined ? "Edit" : "Add"} Brand
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addbrand;
