import React, {useEffect} from 'react';
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useLocation} from 'react-router-dom'; 
import {BiArrowBack} from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector} from "react-redux";
import {getABlog} from '../features/blogs/blogSlice';

const SingleBlog = () => {
  const blogState = useSelector((state) => state?.blog?.singleBlog);
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  useEffect(() => {
    getblog();
  },[]);

  const getblog = () =>{
    dispatch(getABlog(getBlogId));
  };

  return (
    <>
    <Meta title = {blogState?.title ? blogState?.title : ""} />
    <BreadCrumb title = {blogState?.title ? blogState?.title : ""} />
    <div className="container">
      <div className='row'>
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
        <div className="col-12">
           <div className='single-blog-card'>
            <Link to="/blog" className='d-flex align-items-center gap-10'>
            <BiArrowBack className='fs-4'/> 
            Go Back to Blogs</Link>
            <h3  style ={{"fontSize":"35px","textAlign":"center"}}className='title'>
            {blogState?.title}
            </h3>
            <div style={{"display":"flex","justifyContent":"center"}}>
            <img src = 
                 {blogState?.images[0]?.url ? blogState?.images[0]?.url : "https://img.freepik.com/free-photo/beautiful-young-woman-applies-ice-face_186202-6101.jpg?w=740&t=st=1684698190~exp=1684698790~hmac=2c705c75fc3b65374604e246307e6ed44facc4ac335a89227cd3fb990dfbec61"}
                 alt="blog" 
                 className="img-fluid my-2" />
            </div>
            <div style ={{"fontSize":"35px","textAlign":"center"}}>
            <p  dangerouslySetInnerHTML={{ __html: blogState?.description}}></p>
            </div>
           </div>
        </div>
        </div>
        </Container>
      </div>
     </div>
    </>
  );
};

export default SingleBlog;
