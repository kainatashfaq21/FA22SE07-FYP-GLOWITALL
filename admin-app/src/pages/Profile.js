import React, { useState, useEffect } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/auth/authSlice";
import { FaEdit } from "react-icons/fa";
import "./Profile.css";
import axios from "axios";
import { base_url } from "../utils/base_url";

const profileSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup
    .string()
    .email("Email Should be valid")
    .required("Email is Required"),
});

const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.auth?.user);
  const [edit, setEdit] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const [profilePicture, setProfilePicture] = useState(user?.profile || null);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      const inputs = {
        ...values,
        profile: profilePicture,
      };
      dispatch(updateProfile(inputs));
      user.firstname = values.firstname;
      user.lastname = values.lastname;

      user.profile = profilePicture;
      localStorage.setItem("user", JSON.stringify(user));
      setEdit(true);
    },
  });
  const handleProfilePictureUpload = async (e) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const config2 = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    // setProfilePicture(file);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        `${base_url}user/upload/profilePic`,
        formData,
        config2
      );
      console.log(res);
      setProfilePicture(res.data.data);
    } catch (error) {
      console.log("Error uploading profile picture:", error);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="my-3">Update Profile</h3>
            <FaEdit className="fs-3" onClick={() => setEdit(false)} />
          </div>
        </div>
        <div className="col-12">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="example1" className="form-label">
                Profile Picture
              </label>
              {edit ? (
                <div>
                  {profilePicture || user?.profilePicture ? (
                    <div
                      className="profile-pic"
                      style={{
                        backgroundImage: `url(${
                          profilePicture || user.profilePicture
                        })`,
                      }}
                    ></div>
                  ) : (
                    <div className="default-profile-pic"></div>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    onChange={(e) => handleProfilePictureUpload(e)}
                    id="profile-picture-upload"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="profile-picture-upload"
                    className="profile-pic-upload"
                  >
                    {profilePicture || user?.profilePicture ? (
                      <div
                        className="profile-pic"
                        style={{
                          backgroundImage: `url(${
                            profilePicture || user.profilePicture
                          })`,
                        }}
                      ></div>
                    ) : (
                      <div className="default-profile-pic"></div>
                    )}
                    <div className="profile-pic-upload-overlay">
                      <span>Change Profile Picture</span>
                    </div>
                  </label>
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="example1" className="form-label">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                disabled={edit}
                className="form-control"
                id="example1"
                value={formik.values.firstname}
                onChange={formik.handleChange("firstname")}
                onBlur={formik.handleBlur("firstname")}
              />
              <div className="error">
                {formik.touched.firstname && formik.errors.firstname}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="example2" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                disabled={edit}
                className="form-control"
                id="example2"
                value={formik.values.lastname}
                onChange={formik.handleChange("lastname")}
                onBlur={formik.handleBlur("lastname")}
              />
            </div>
            <div className="error">
              {formik.touched.lastname && formik.errors.lastname}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                disabled={edit}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
              />
              <div className="error">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>

            {edit === false && (
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
