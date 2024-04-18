import React, { useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import MainLayout from "../components/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "User Name",
    dataIndex: "user",
    render: (user) => (
      <div>
        <p>
          {user?.firstName} {user?.lastName}
        </p>
      </div>
    ),
  },
  {
    title: "Shipping Info",
    dataIndex: "shippingInfo",
    render: (shippingInfo) => (
      <div>
        <p>Address: {shippingInfo?.address}</p>
        <p>City: {shippingInfo?.city}</p>
      </div>
    ),
  },
  {
    title: "Total Products",
    dataIndex: "totalProducts",
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatus",
  },
  {
    title: "paid At",
    dataIndex: "paidAt",
  },
  {
    title: "Order Status",
    dataIndex: "orderStatus",
  },
];
// const data1 = [];
// for (let i = 0; i < 46; i++) {
//   data1.push({
//     key: i,
//     name: `Edward King ${i}`,
//     product: 32,
//     staus: `London, Park Lane no. ${i}`,
//   });
// }

const Dashboard = () => {
  
  const config = {
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth.orders);
  console.log(orderState);
  const data1 = orderState?.map((order, index) => {
    const shippingInfo = order?.shippingInfo || {};
    return {
      key: index + 1,
      user: shippingInfo,
      shippingInfo: shippingInfo,
      totalProducts: order?.orderItems?.length,
      paymentStatus: order?.paymentStatus,
      paidAt: new Date(order?.paidAt).toLocaleString(),
      orderStatus: order?.orderStatus,
    };
  });

  return (
    <div>
      
      <div className="mt-4">
        <h3 className="mb-4 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;