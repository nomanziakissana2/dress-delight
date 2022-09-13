import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Table,
  Toast,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
// import { Store } from '../../Store';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ViewUserScreen() {
  const [query, setQuery] = useState();
  const navigate = useNavigate();
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  const deleteItem = async (id) => {
    const res = await axios.delete(`api/admin/removeProduct/${id}`);

    if (res) {
      console.log(res);
      toast.success('remove product');
      navigate('/productList');
    } else {
      toast.error('Not found');
    }
  };

  // const [product, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');

        // setProducts(result.data.products);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.products });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    navigate(query ? `/searchProducts/?query=${query}` : '/searchProducts');
  };

  return (
    <div>
      <Helmet>Products </Helmet>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger" />
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
          <h1>All Products</h1>

          <p style={{ textAlign: 'right' }}>
            Total Products : {products.length}
          </p>
          <Table striped hover size="sm" responsive>
            <thead>
              <tr>
                <th> Id</th>
                <th>image</th>
                <th>slug</th>
                <th>Actual price</th>
                <th>price</th>
                <th>Quantity</th>
                {/* <th>slug</th> */}
                <th>Brand</th>
                <th>Rating</th>
                <th>Sale in %</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>
                    <img
                      className="img-fluid rounded img-thumbnail"
                      src={product.image}
                      alt=""
                    ></img>
                  </td>
                  <td>{product.slug}</td>
                  <td>PKR. {product.actualPrice}</td>
                  <td>PKR. {product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.brand}</td>
                  <td>{product.rating}</td>
                  <td>{product.sale} %</td>
                  <td>
                    <Button
                      type="button"
                      variant="success"
                      onClick={() => {
                        navigate(`/productEdit/${product._id}`);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => {
                        deleteItem(product._id);
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
        </div>
      )}
    </div>
  );
}
