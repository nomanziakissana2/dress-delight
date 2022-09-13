import axios from 'axios';
import React, { useReducer } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Table,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../../Store';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCES':
      return { ...state, loading: false, orders: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default function ViewOrderScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  // console.log(userInfo.token);
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    orders: [],
  });
  useEffect(() => {
    const fetchOrder = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await axios.get('/api/admin/orders');
      dispatch({ type: 'FETCH_SUCCES', payload: data });
    };
    fetchOrder();
  }, []);
  const [query, setQuery] = useState();
  const submitHandler = async (e) => {
    e.preventDefault();
    navigate(query ? `/searchOrder/?query=${query}` : '/searchOrder');
  };
  const deleteOrder = async (id) => {
    const res = await axios.delete(`api/orders/removeOrder/${id}`);

    if (res) {
      toast.success('remove product');
      navigate('/orderHistory');
    } else {
      toast.error('Not found');
    }
  };
  return (
    <div>
      <Helmet>Orders </Helmet>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox></MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <Form onSubmit={submitHandler}>
                <InputGroup>
                  <FormControl
                    type="text"
                    name="q"
                    id="q"
                    aria-label="Search Products"
                    aria-describedby="button-search"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search By Customer Name or Mobile Number..."
                  ></FormControl>
                  <Button
                    variant="outline-primary"
                    type="submit"
                    id="button-search"
                  >
                    <i className="fas fa-search"></i>
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
          <h1>Orders</h1>

          <Table striped borderered hover size="sm" responsive>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Sent To</th>
                <th>Mobile</th>
                <th>Address</th>
                {/* <th>image</th> */}

                <th>Actual Price</th>
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
                  <td>{order.shippingAddress.contactNumber}</td>
                  <td>{order.shippingAddress.address}</td>
                  {/* <td>{order.orderItem[0].quantity}</td> */}
                  <td>{order.actualPrice.toFixed(2)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isDelivered ? 'Delivered' : 'Not Delivered'}</td>
                  <td>
                    <Button
                      type="button"
                      variant="success"
                      onClick={() => {
                        navigate(`/orderDetail/${order._id}`);
                      }}
                    >
                      Details
                    </Button>
                  </td>
                  <td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <strong>
            Total Sale : {orders.reduce((a, c) => a + c.totalPrice, 0)}
          </strong>
          {'              '}
          <strong>
            Total Buying Price : {orders.reduce((a, c) => a + c.actualPrice, 0)}
          </strong>
          {'              '}
          <strong>
            Total income :{' '}
            {orders.reduce((a, c) => a + c.totalPrice, 0) -
              orders.reduce((a, c) => a + c.actualPrice, 0)}
          </strong>
        </div>
      )}
    </div>
  );
}
