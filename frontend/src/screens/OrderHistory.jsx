import axios from 'axios';
import React from 'react';
import { useReducer } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Button, Row, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../utils';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export default function OrderHistory() {
  const navigate = useNavigate();
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    orders: [],
  });
  const { state } = useContext(Store);
  const { userInfo } = state;
  // console.log(userInfo.data._id);
  const deleteOrder = async (id) => {
    const res = await axios.delete(`api/orders/removeOrder/${id}`);

    if (res) {
      toast.success('remove product');
      navigate('/orderHistory');
    } else {
      toast.error('Not found');
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/mine/${userInfo._id}`);
        console.log(data);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };

    fetchData();
  }, [userInfo]);
  return (
    <div>
      <Helmet>Order History</Helmet>
      <h1>Order History</h1>

      <Table
        striped
        borderered
        hover
        size="sm"
        responsive
        style={{ height: '10rem' }}
      >
        <thead>
          <tr>
            <th>Order Id</th>
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
              {/* <td>
                  <img
                    className="img-fluid rounded img-thumbnail"
                    src={order.orderItem[0].image}
                    alt=""
                  ></img>
                </td> */}
              <td>{order.createdAt.substring(0, 10)}</td>
              {/* <td>{order.orderItem[0].quantity}</td> */}
              <td>{order.totalPrice.toFixed(2)}</td>
              <td>{order.isDelivered ? 'Delivered' : 'Not Delivered'}</td>
              <td>
                <Button
                  type="button"
                  variant="light"
                  onClick={() => {
                    navigate(`/order/${order._id}`);
                  }}
                >
                  Details
                </Button>
              </td>
              <td>
                {order.isDelivered ? (
                  'Parsal Delivered'
                ) : (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => {
                      deleteOrder(order._id);
                      window.location.reload(true);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
