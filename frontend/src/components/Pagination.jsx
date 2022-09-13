import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import products from '../data';
import Product from './Product';

export default function Pagination() {
  //pagination
  const [product, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 2;
  const pageVisited = pageNumber * userPerPage;
  const displayProducts = Array.from(product)
    .slice(pageVisited, pageVisited + userPerPage)
    .map((prod) => {
      return (
        <div>
          <Product product={product}></Product>
        </div>
      );
    });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data.products);
      console.log(result.data.products);
    };
    fetchData();
  }, []);
  const pageCount = Math.ceil(product.length / userPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div>
      {displayProducts}
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
