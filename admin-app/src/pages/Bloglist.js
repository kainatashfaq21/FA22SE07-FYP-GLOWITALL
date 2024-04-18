import React, { useEffect, useState } from "react";
import { Table, Input, Popconfirm } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteABlog, getBlogs, resetState } from "../features/blogs/blogSlice";
import CustomModal from "../components/CustomModal";
const { Search } = Input;
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);

  const hideModal = () => {
    setOpen(false);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  const getBlogState = useSelector((state) => state.blogs);
  const data1 = getBlogState?.blogs
    .filter((blog) => {
      console.log(blog);
      const { title } = blog;
      const lowerCaseTerm = searchTerm.toLowerCase();
      return title?.toLowerCase().includes(lowerCaseTerm);
    })
    .map((blog, index) => ({
      key: index + 1,
      name: blog?.title,
      category: blog?.category,
      action: (
        <>
          <Link to={`/admin/blog/${blog?._id}`} className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blog?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    }));

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));
    window.location.reload();
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Blogs List</h3>
      <Search
        placeholder="Search by title or category"
        allowClear
        enterButton
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      />
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlog(blogId);
        }}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  );
};

export default Bloglist;
