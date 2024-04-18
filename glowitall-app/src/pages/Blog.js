import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import BlogCard from "../components/BlogCard";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllBlogs} from '../features/blogs/blogSlice';
import moment from 'moment';

const Blog = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const dispatch = useDispatch();
  useEffect(() => {
    getblogs();
  },[]);

  const getblogs = () =>{
    dispatch(getAllBlogs());
  }; 
  // console.log("bloggggggggg",blogState )

  return (
    <>
      <Meta title={"Blogs"} />   
      <BreadCrumb title="Blogs" />   
      <Container class1="blog-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Find Products By Categories</h3>
                <div>
                  <ul className="ps-0">
                  <li> <Link to="/Shop-All"  style={{textDecoration:"none" ,color:"var(--color-777777)"}}>Shop by All</Link></li>
                    <li> <Link to="/Eyes-makeup"  style={{textDecoration:"none" ,color:"var(--color-777777)"}}>Eyes Makeup</Link></li>
                    <li> <Link to="/Face-makeup"  style={{textDecoration:"none" ,color:"var(--color-777777)"}}>Face Makeup</Link></li>
                    <li> <Link to="/lips-makeup"  style={{textDecoration:"none" ,color:"var(--color-777777)"}}>Lips Makeup</Link></li>
                    <li> <Link to="/eyes-skincare"  style={{textDecoration:"none" ,color:"var(--color-777777)"}}>Eyes Skincare</Link></li>
                    <li> <Link to="/face-skincare"  style={{textDecoration:"none" ,color:"var(--color-777777)"}}>Face Skincare</Link></li>
                    <li> <Link to="/lips-skincare"  style={{textDecoration:"none" ,color:"var(--color-777777)"}}>Lips Skincare</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
              {blogState && blogState.map((item , index) => {
                  return(
                    <div className="col-6 mb-3" key={index}>
                      <BlogCard 
                         id={item?._id}
                         title={item?.title}
                         description={item?.description}
                         image={item?.images[0]?.url}
                         date={moment(item?.createdAt).format(
                          "MMM Do YYYY, h:mm a"
                         )}
                         /> 
                    </div>
                  );
                  })
                }
                
              </div>
            </div>
          </div>
      </Container>
    </>
  );
};

export default Blog;
