import React, { useEffect, useState } from "react";
import { Table, Input, Popconfirm } from "antd";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import { base_url } from "../utils/base_url";
import { config } from "../utils/axiosconfig";
const { Search } = Input;
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
    title: "Email",
    dataIndex: "email",
    render: (user) => (
      <div>
        <p>{user?.email}</p>
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
    title: "Product",
    dataIndex: "product",
    render: (products) => (
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product?.title} - Quantity: {product?.quantity}
          </li>
        ))}
      </ul>
    ),
  },

  {
    title: "Color",
    dataIndex: "color",
    render: (color) => (
      <div>
        {color &&
          color.map((c, index) => {
            if (c && c.title && c.title !== null) {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: Array.isArray(c.title)
                      ? c.title.title
                      : c.title.title,
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "5px",
                  }}
                >
                  {/* {c?.title.title} Display the specific property */}
                </div>
              );
            }
            return null;
          })}
      </div>
    ),
  },

  {
    title: "Amount",
    dataIndex: "amount",
    render: (amount) => <p>${amount}</p>,
  },
  {
    title: "created At",
    dataIndex: "createdAt",
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

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth.orders);
  // console.log("order state", orderState);
  const data = orderState
    ?.filter((order) => {
      const { user } = order;
      const fullName =
      `${user?.firstname} ${user?.lastname}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  })

    .map((order, index) => {
      const shippingInfo = order?.shippingInfo || {};
      return {
        key: index + 1,
        user: shippingInfo,
        email: order?.user,
        shippingInfo: shippingInfo,
        product: order?.orderItems.map((product) => ({
          title: product?.productId?.title,
          quantity: product?.quantity,
        })),
        color: order?.orderItems.map((product) => ({
          title: product?.color,
        })),
        amount: order?.totalPrice,
        paymentStatus: order?.paymentStatus,
        orderStatus: order?.orderStatus,
        paidAt: new Date(order?.paidAt).toLocaleString(),
        createdAt: new Date(order?.createdAt).toLocaleString(),
        action: (
          <>
            {order?.orderStatus === "Ordered" && (
              <Button onClick={() => handleUpdateStatus(order)}>
                Update status to delivered
              </Button>
            )}
            {order?.orderStatus === "delivered" && <span>Order Delivered</span>}
          </>
        ),
      };
    });
  console.log(data);

  const handleUpdateStatus = async (order) => {
    try {
      const data = {
        orderStatus: "delivered",
      };
      const response = await axios.put(
        `${base_url}user/orders/${order._id}`,
        data,
        config
      );
      // console.log(response);
      if (response.status == 200) {
        toast.info(response.data.message);
        dispatch(getOrders());
      }
    } catch (error) {
      toast.info("Internal Server Error");
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <Search
        placeholder="Search by title or category"
        allowClear
        enterButton
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      />
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Orders;
