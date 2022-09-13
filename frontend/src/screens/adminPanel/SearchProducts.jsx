import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SearchProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const searchIs = sp.get('query');
  console.log(searchIs);
  useEffect(() => {
    // console.log(searchIs);
    const fetchOrders = async () => {
      const searchResult = await axios.get(`/api/admin/products/${searchIs}`);
      if (searchResult) {
        setProducts(searchResult.data);
      }
    };
    fetchOrders();
  }, [searchIs]);
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

  return (
    <div>
      <Helmet>Products </Helmet>
      <h1>Products</h1>
      <Table striped hover size="sm" responsive>
        <thead>
          <tr>
            <th> Id</th>
            <th>image</th>
            <th>slug</th>

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
      </Table>{' '}
    </div>
  );
}
