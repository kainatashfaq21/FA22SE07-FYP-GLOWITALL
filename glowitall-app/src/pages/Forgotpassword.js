import React from 'react';
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from 'react-router-dom';
import Container from "../components/Container";
import CustomInput from '../components/CustomInput';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector} from "react-redux";
import {forgotPasswordToken} from '../features/users/userSlice';


const emailSchema = yup.object({
  email: yup.string().email("Email Should be valid").required("Email is Required"),  
});

const Forgotpassword = () => {

  const navigate=useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema:emailSchema,
    onSubmit: (values) => {
      dispatch(forgotPasswordToken(values));
    },
  });

  return (
   <>
    <Meta title={"Forgot Password"} />
    <BreadCrumb title="Forgot Passsword" />
    <Container class1='login-wrapper py-5 home-wrapper-2'>
      <div className='row'>
        <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center'>Reset Your Password</h3>
              <p className='text-center mt-2 mb-3'>We will send you an email to reset your password</p>
              <form 
              onSubmit={formik.handleSubmit}
              action='' 
              className='d-flex flex-column gap-15'>
                <CustomInput 
                type="email" 
                name='email' 
                placeholder='Email'
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                value={formik.values.email} />
                 <div className="error text-center">
                  {formik.touched.email && formik.errors.email}
                 </div>

                <div>
                    <div className='mt-3 d-flex justify-content-center flex-column gap-15 align-itmes-center'>
                        <button className='button border-0 align-itemes-center' type='submit'>Submit</button>
                        <Link to="/login " >Cancel  </Link >
                    </div>
                </div>
              </form>
            </div>
        </div>
      </div>

    </Container>
   </>
  );
};

export default Forgotpassword;