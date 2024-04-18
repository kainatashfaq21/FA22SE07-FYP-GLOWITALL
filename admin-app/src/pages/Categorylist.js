import React, { useEffect, useState } from "react";
import { Table, Input, Button, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  getCategories,
  deleteAProductCategory,
} from "../features/pCategory/pCategorySlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "../components/CustomModal";
import { resetState } from "../features/pCategory/pCategorySlice";
const { Search } = Input;
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "  Action",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const pCatState = useSelector((state) => state.pCategory.pCategories);
  const data1 = pCatState
    .filter((category) => {
      const { title } = category;
      const lowerCaseTerm = searchTerm.toLowerCase();
      return title.toLowerCase().includes(lowerCaseTerm);
    })
    .map((item, index) => ({
      key: index + 1,
      name: item.title,
      action: (
        <>
          <Link to={`/admin/category/${item._id}`} className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <Button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(item._id)}
          >
            <AiFillDelete />
          </Button>
        </>
      ),
    }));

  const deleteCategory = (pCatId) => {
    dispatch(deleteAProductCategory(pCatId))
      .then(() => {
        setOpen(false);
        toast.success("Category deleted successfully!");
        dispatch(getCategories());
      })
      .catch(() => {
        toast.error("Failed to delete category!");
      });
  };
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div>
      <h3 className="mb-4 title">Product Categories </h3>
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
          deleteCategory(pCatId);
        }}
        title="Are you sure to delete this Product Category?"
      />
    </div>
  );
};

export default CategoryList;
