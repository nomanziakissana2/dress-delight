import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Pagination } from 'react-bootstrap';

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

export default function HomeScreen() {
  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 24;
  const pageVisited = pageNumber * userPerPage;
  // end Pagination
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

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
  //pagination
  const displayProducts = Array.from(products).slice(
    pageVisited,
    pageVisited + userPerPage
  );
  const pageCount = Math.ceil(products.length / userPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  // end pagination
  return (
    <div>
      {/* <Link to="/practice">Practice</Link> */}
      <Helmet>
        <title>Dress Delight</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {displayProducts.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
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
    </div>
  );
}
