import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchOrders() {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const searchIs = sp.get('query');
  console.log(searchIs);
  useEffect(() => {
    // console.log(searchIs);
    const fetchOrders = async () => {
      const searchResult = await axios.get(`/api/admin/orders/${searchIs}`);
      if (searchResult) {
        setOrders(searchResult.data);
        console.log(searchResult.data);
        setName(searchResult.data.shippingAddress.fullName);
      }
    };
    fetchOrders();
  }, [searchIs]);
  return (
    <div>
      <Helmet>Orders </Helmet>

      <h1>Orders</h1>

      <Table striped hover size="sm" responsive>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Sent To</th>
            <th>Address</th>
            <th>Mobile</th>
            {/* <th>image</th> */}
            <th>date</th>
            {/* <th>Quantity</th> */}
            <th>Totel</th>
            <th>Delivered</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.shippingAddress.fullName}</td>
              {/* <td>
                  <img
                    className="img-fluid rounded img-thumbnail"
                    src={order.orderItem[0].image}
                    alt=""
                  ></img>
                </td> */}
              <td>{order.shippingAddress.address}</td>
              <td>{order.shippingAddress.contactNumber}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              {/* <td>{order.orderItem[0].quantity}</td> */}
              <td>{order.totalPrice.toFixed(2)}</td>
              <td>{order.isDelivered ? 'Delivered' : 'Not Delivered'}</td>
              <td>
                <Button
                  type="button"
                  variant="light"
                  onClick={() => {
                    navigate(`/orderDetail/${order._id}`);
                  }}
                >
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
