import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteAColor, getColors } from "../features/color/colorSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { resetState } from "../features/color/colorSlice";
const { Search } = Input;
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Color",
    dataIndex: "color",
    render: (color) => (
      <div
        style={{
          backgroundColor: color?.title,
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          display: "inline-block",
          marginRight: "5px",
        }}
      />
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const showModal = (id) => {
    setOpen(true);
    setcolorId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, []);
  const colorState = useSelector((state) => state.color.colors);
  const data1 = colorState.map((color, index) => ({
    key: index + 1,
    color: color,
    action: (
      <>
        <Link to={`/admin/color/${color._id}`} className="fs-3 text-danger">
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(color._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const deleteColor = (e) => {
    dispatch(getColors());
    dispatch(deleteAColor(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };
  // const handleSearch = (value) => {
  //   setSearchTerm(value);
  // };

  return (
    <div>
      <h3 className="mb-4 title">Colors</h3>
      {/* <Search
        placeholder="Search by name"
        allowClear
        enterButton
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      /> */}
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteColor(colorId);
        }}
        title="Are you sure you want to delete this color?"
      />
    </div>
  );
};

export default Colorlist;
