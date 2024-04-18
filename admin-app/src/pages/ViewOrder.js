import React ,{useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {Link, useLocation} from "react-router-dom";
import { getOrderByUser, getOrders } from '../features/auth/authSlice';

const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Count',
      dataIndex: 'count',
    },
    {
      title: 'Color',
      dataIndex: 'color',
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
 

const Vieworder = () => {
    const location = useLocation();
    const userId = location.pathname.split("/")[3];
    const dispatch = useDispatch();
    useEffect(()=>{dispatch(getOrderByUser(userId))},[]);
    const orderState = useSelector((state)=>state.auth.orderbyuser && state.auth.orderbyuser[0]);
    const data1 = [];
    if(orderState){
      for (let i = 0; i < orderState.length; i++) {
        data1.push({
          key: i + 1,
          name: orderState[i].products.product.title,
          brand: orderState[i].products.product.brand,
          amount:orderState[i].products.product.price,
          count:orderState[i].products.product.count,
          color:orderState[i].products.product.color,
          date:orderState[i].products.product.createdAt,
          action:(
            <>
            <Link to="/">
            <BiEdit/>
            </Link>
            <Link to="/">
            <AiFillDelete/>
            </Link>
            </>
          )
        });
      }
    }
  return (
    <div>
    <h3 className="mb-4 title">View Order </h3>
    {/* <Search
        placeholder="Search by title or category"
        allowClear
        enterButton
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      /> */}
    <div>
      <Table columns={columns} dataSource={data1} />
    </div>
  </div>
  )
}

export default Vieworder;