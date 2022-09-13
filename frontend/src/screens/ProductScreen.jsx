import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getError } from '../utils';
import Rating from '../components/Rating';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Button, Form, FormGroup, FormSelect } from 'react-bootstrap';
import { Store } from '../Store';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        product: action.payload.product,
        reviews: action.payload.product.reviews,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductScreen() {
  const [size, setSize] = useState('Small');
  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 10;
  const pageVisited = pageNumber * userPerPage;
  const [pro, setPro] = useState([]);
  // end Pagination
  const [rating, setRating] = useState(0);
  const [reviewis, setReviews] = useState('');
  const [newReviews, setNewReviews] = useState(0);
  const [btnDisable, setbtnDisable] = useState(false);

  const nevigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product, reviews }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);

        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        // console.log(reviews);
        setNewReviews(result.data.reviews.length);
        setPro(result.data.reviews);
        if (userInfo) {
          result.data.reviews.forEach((element) => {
            if (element.user === userInfo._id) {
              setRating(element.rating);
              setReviews(element.comment);
              setbtnDisable(true);
            }
          });
        }
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };
    fetchData();
  }, [slug]);
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find(
      (x) => x._id === product._id && x.size === size
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sory. Product out of stock');
      return;
    }
    cxtDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity, size },
    });
    nevigate('/cart');
  };
  // console.log(product.reviews);
  const deleteReview = async () => {
    const deleteRevi = await axios.post(`/api/reviews/delete/${product._id}`, {
      user: userInfo._id,
    });
    if (deleteRevi) {
      window.location.reload(true);
    }
  };
  const comentsHandler = async (e) => {
    // e.preventDefault();

    setReviews(e.target.value);
    if (userInfo) {
      try {
        const review = await axios.post(`/api/reviews/${product._id}/reviews`, {
          userId: userInfo._id,
          comment: reviewis,
          rating: rating,
          name: userInfo.name,
        });
        console.log(review);
      } catch (error) {
        toast.error('you already rate this product');
      }
    } else {
      toast.error('please Login to Rate product');
    }
  };
  //pagination
  const displayProducts = Array.from(pro).slice(
    pageVisited,
    pageVisited + userPerPage
  );
  const pageCount = Math.ceil(pro.length / userPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  // end pagination
  return (
    <div>
      <Helmet>Product Details</Helmet>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Row>
          <Col md={6}>
            <img className="img-large" src={product.image} alt={product.name} />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  className="rating"
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>
                Price: <strong>Rs. </strong>
                {product.price - (product.price * product.sale) / 100}
              </ListGroup.Item>
              <ListGroup.Item>
                Discription: <p>{product.description}</p>
              </ListGroup.Item>
              {product.category === 'Shoes' ? (
                <FormGroup className="mb-3 mt-3" controlId="quality">
                  <Form.Label>Size</Form.Label>
                  <FormSelect
                    onChange={(e) => setSize(e.target.value)}
                    required
                  >
                    <option value="Small">36</option>
                    <option value="Medium">37</option>
                    <option value="Larg">38</option>
                    <option value="XL">39</option>
                    <option value="2L">40</option>
                    <option value="3L">41</option>
                    <option value="XL">42</option>
                    <option value="2L">43</option>
                    <option value="3L">44</option>
                  </FormSelect>{' '}
                </FormGroup>
              ) : (
                <FormGroup className="mb-3 mt-3" controlId="quality">
                  <Form.Label>Size</Form.Label>
                  <FormSelect
                    onChange={(e) => setSize(e.target.value)}
                    required
                  >
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Larg">Large</option>
                    <option value="XL">XL</option>
                    <option value="2L">2XL</option>
                    <option value="3L">3XL</option>
                  </FormSelect>{' '}
                </FormGroup>
              )}
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        Rs.{' '}
                        {product.price - (product.price * product.sale) / 100}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {' '}
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={addToCartHandler} variant="primary">
                          Add To Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <div className="mt-4">
        <hr></hr>
        <Row className="mt-4">
          <Col md={12}>
            <h4>Product Details Of {product.name}</h4>
            <ul>
              <li>{product.name}</li>
              <li>{product.quality || 'Good'}</li>
            </ul>

            <div className="description">
              <p>{product.description}</p>
            </div>
            <hr></hr>
            <h4>Specification of {product.name}</h4>
            <Row>
              <Col md={6}>
                <p style={{ color: 'gray' }}>Brand</p>
                <p>{product.brand}</p>
              </Col>
              <Col>
                <p style={{ color: 'gray' }}>Brand</p>
                <p>{product.brand}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <hr></hr>

      <Row className="mt-3">
        <Col md={5}>
          <h4>Give Rating to this product</h4>
          <Form>
            <div>
              <i
                type="button"
                className="rating-btn"
                onClick={() => setRating(1)}
              >
                <i className={rating >= 1 ? 'fas fa-star' : 'far fa-star'}></i>
              </i>
              <i
                type="button"
                className="rating-btn"
                onClick={() => setRating(2)}
              >
                <i className={rating >= 2 ? 'fas fa-star' : 'far fa-star'}></i>
              </i>
              <i
                type="button"
                className="rating-btn"
                onClick={() => setRating(3)}
              >
                <i className={rating >= 3 ? 'fas fa-star' : 'far fa-star'}></i>
              </i>
              <i
                type="button"
                className="rating-btn"
                onClick={() => setRating(4)}
              >
                <i className={rating >= 4 ? 'fas fa-star' : 'far fa-star'}></i>
              </i>
              <i
                type="button"
                className="rating-btn"
                onClick={() => setRating(5)}
              >
                <i className={rating >= 5 ? 'fas fa-star' : 'far fa-star'}></i>
              </i>
              {/* <Button
                style={{ marginLeft: '2rem' }}
                variant="primary"
                type="submit"
              >
                Submit
              </Button> */}

              {/* <Rating rating={rating} numReviews={10}></Rating> */}
            </div>
          </Form>
        </Col>
        <Col md={7}>
          <h4>Avg. Rating</h4>

          <h1>
            {parseFloat(product.rating).toFixed(1)}/
            <span style={{ color: 'gray' }}>5</span>
          </h1>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col md={12}>
          <h4>Reviews</h4>
          <Form onSubmit={comentsHandler}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Reviews</Form.Label>
              <Form.Control
                value={reviewis}
                type="text"
                required
                as="textarea"
                row="5"
                onChange={(e) => setReviews(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div className="mb-3">
              {btnDisable ? (
                <div>
                  <Button type="submit" disabled>
                    Review Submited
                  </Button>
                  <Button
                    onClick={deleteReview}
                    style={{ marginLeft: '1rem' }}
                    variant="danger"
                  >
                    Delete
                  </Button>
                  <p style={{ color: 'green' }}>Thanxs for your Review</p>
                </div>
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </div>
          </Form>
          <Row>
            {newReviews === 0 ? (
              <MessageBox variant="alert alert-info mt-3">
                No Reviews
              </MessageBox>
            ) : (
              displayProducts.map((rev) => (
                <div
                  key={rev._id}
                  className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                >
                  <strong>{rev.name}</strong>
                  <Rating rating={rev.rating} numReviews={1}></Rating>
                  <span>
                    {rev.createdAt.slice(0, 10) +
                      ' ' +
                      rev.createdAt.slice(11, 16)}
                  </span>
                  <div className="alert alert-info mt-3">{rev.comment}</div>
                </div>
              ))
            )}
          </Row>
        </Col>
        <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'paginatin-btn'}
          previousLinkClassName={'prev-btn'}
          nextLinkClassName={'next-btn'}
          disabledClassName={'pagination-Disabled'}
          activeClassName={'pagination-active'}
        ></ReactPaginate>
      </Row>
    </div>
  );
}
