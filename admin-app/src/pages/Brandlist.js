import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import { getBrands } from "../features/brand/brandSlice";
import { deleteBrand as deleteBrandAction } from "../features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { resetState } from "../features/brand/brandSlice";
import CustomModal from "../components/CustomModal";

const { Search } = Input;

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deletionStatus, setDeletionStatus] = useState(false);

  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
    dispatch(resetState());
  }, [dispatch, deletionStatus]);

  const brandState = useSelector((state) => state.brand.brands);

  const data1 = brandState
    .filter((brand) =>
      brand.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((brand, index) => ({
      key: index + 1,
      name: brand.title,
      action: (
        <>
          <Link to={`/admin/brand/${brand._id}`} className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brand._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    }));

    const deleteBrand = (brandId) => {
      dispatch(deleteBrandAction(brandId));
      setDeletionStatus(true);
      setOpen(false);
      
    };
  
  return (
    <div>
      <h3 className="mb-4 title">Brands </h3>
      <div>
        <Search
          placeholder="Search by brand name"
          allowClear
          enterButton
          onSearch={(value) => setSearchTerm(value)}
          style={{ width: 200, marginBottom: 16 }}
        />
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(brandId);
        }}
        title="Are you sure to delete this brand?"
      />
    </div>
  );
};

export default Brandlist;
