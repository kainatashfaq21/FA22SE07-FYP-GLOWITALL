import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  TextField,
  Select,
  FormControl,
  Typography,
  InputLabel,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  createBlog,
  getABlog,
  resetState,
  updateBlog,
} from "../features/blogs/blogSlice";
import { getCategories } from "../features/bCategory/bCategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
});

const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const blogState = useSelector((state) => state.blogs);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    updatedBlog,
    blogName,
    blogDesc,
    blogCategory,
    blogImages,
  } = blogState;
  const [img, setImg] = useState([]);
  useEffect(() => {
    if (blogImages) {
      setImg(blogImages); // Set blog images if available
    }
  }, [blogImages]);

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
    }
    // } else {
    //   dispatch(resetState());
    // }
  }, [getBlogId]);

  useEffect(() => {
    // dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const handleDrop = (acceptedFiles) => {
    dispatch(uploadImg(acceptedFiles));
  };
  useEffect(() => {
    if (imgState) {
      const existingImages = imgState.map((image) => ({
        public_id: image.public_id,
        url: image.url,
      }));
      setImg((prevImages) => [...prevImages, ...existingImages]);
    }
  }, [imgState]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      category: blogCategory || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data));
        toast.success("Blog Updated Successfully!");
        setTimeout(() => {
          navigate("/admin/blog-list");
        }, 1000);
      } else {
        dispatch(createBlog(values));
        formik.resetForm();
        toast.success("Blog Added Successfully!");
        setTimeout(() => {
          window.location.href = "http://localhost:3001/admin/blog-list";
        }, 1000);
      }
      dispatch(resetState());
    },
  });
  useEffect(() => {
    formik.values.images = img;
  }, [img]);
  // console.log("============> blogImages", getBlogId);
  // console.log("============> blogImages", blogImages);
  // console.log("============> img", img);
  // console.log("============>", formik.values);
  const handleDeleteImage = (publicId) => {
    dispatch(deleteImg(publicId));

    setImg((prevImages) =>
      prevImages.filter((image) => image.public_id !== publicId)
    );
  };

  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogId !== undefined ? "Edit" : "Add"} Blog
      </h3>

      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <Typography variant="h6" component="h6">
              Enter Blog Title
            </Typography>
            <TextField
              type="text"
              label="Enter Blog Title"
              name="title"
              className="form-control"
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              value={formik.values.title}
              fullWidth
            />
          </div>
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="mt-4">
            <Typography variant="h6" component="h6">
              Select Blog category
            </Typography>
            <FormControl className="form-control">
              <InputLabel id="category-label">Select Blog Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
              >
                <MenuItem value="">Select Blog Category</MenuItem>
                {bCatState?.map((i, j) => (
                  <MenuItem key={j} value={i.title}>
                    {i.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="error">
              {formik.touched.category && formik.errors.category}
            </div>
          </div>
          <div className="mt-4">
            <Typography variant="h6" component="h6">
              Enter Blog Description
            </Typography>
            <FormControl className="form-control">
              <ReactQuill
                theme="snow"
                className="mt-3"
                name="description"
                id="description"
                onChange={formik.handleChange("description")}
                onBlr={formik.handleBlur("description")}
                value={formik.values.description}
              />
            </FormControl>
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <div className="bg-white border-1 p-5 text-center mt-3">
            <Typography variant="h6" component="h6">
              Select Pictures for Blog
            </Typography>
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
          <div className="showimages d-flex flex-wrap mt-3 gap-3">
            {img?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
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
            {getBlogId !== undefined ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
