import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import { getUsers } from "../features/customers/customerSlice";
import { useDispatch, useSelector } from "react-redux";

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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const customerState = useSelector((state) => state.customer.customers);
  const [searchTerm, setSearchTerm] = useState("");

  const data = customerState
    .filter((customer) => customer.role !== "admin")
    .filter((customer) => {
      const fullName =
        `${customer.firstname} ${customer.lastname}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    })
    .map((customer, index) => ({
      key: index + 1,
      name: customer.firstname + " " + customer.lastname,
      email: customer.email,
      address: customer.address,
    }));

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <Search
        placeholder="Search by name"
        allowClear
        enterButton
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Customers;
