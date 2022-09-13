import axios from 'axios';
import React, { useReducer } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { Store } from '../../Store';
import { getError } from '../../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export default function OrderDetailsScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const auth = `Bearer ${userInfo.token}`;
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: {
            Autherization: auth,
          },
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };

    fetchOrder();
  }, [orderId, userInfo]);
  const deliveredClick = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get('/api/products');
      // forEach for get all product from products Table
      data.products.forEach((element) => {
        // forEach for get all product from order table
        order.orderItem.forEach((odrId) => {
          //compare orderId with Product table id
          const isEquel = element._id === odrId._id;
          if (isEquel) {
            const newQuantity = element.countInStock - odrId.quantity;
            const { ord } = axios.patch('/api/admin/delivered', {
              orderId: orderId,
              isDelivered: true,
              quentity: newQuantity,
              id: odrId._id,
            });
            navigate('/orderList');
          }
        });
      });
    } catch (error) {
      toast.error('Error: No record found');
    }
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox></MessageBox>
  ) : (
    <div>
      <Helmet>Order {orderId}</Helmet>
      <h1>Order {orderId}</h1>
      <Row md={8}>
        <Col className="md-3">
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong>
                {order.shippingAddress.fullName}
                <br></br>
                <strong>Address: </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country},
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">Delivered</MessageBox>
              ) : (
                <div>
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                  <Button onClick={deliveredClick}>Mark as Delivered</Button>
                </div>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong>
                {order.paymentMethod}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                <Row>
                  <Col md={2}>
                    <strong>Image</strong>
                  </Col>
                  <Col md={2}>
                    <strong>Name</strong>
                  </Col>
                  <Col md={4}>
                    <strong>Id</strong>
                  </Col>
                  <Col md={2}>
                    <strong>Quantity</strong>
                  </Col>

                  <Col md={2}>
                    <strong>Price</strong>
                  </Col>
                </Row>
                {order.orderItem.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={2}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                      </Col>
                      <Col md={2}>
                        <span>{item.name}</span>
                      </Col>
                      <Col md={4}>
                        <span>{item._id}</span>
                      </Col>
                      <Col md={2}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={2}>${item.price.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>

              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Item Price</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping Price</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax Price</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {loading && <LoadingBox variant="danger">{error}</LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
