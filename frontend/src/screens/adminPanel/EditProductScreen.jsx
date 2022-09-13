import axios from 'axios';
import React, { useReducer } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export default function EditProductScreen() {
  const params = useParams();
  const { id } = params;
  const [{ loading, products, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: {},
  });
  const [name, setName] = useState();
  const [slug, setSlug] = useState();
  const [brand, setBrand] = useState();
  const [countInStock, setCountInStock] = useState();
  const [discription, setDisription] = useState();
  const [price, setPrice] = useState();
  const [actualPrice, setActualPrice] = useState();
  const [category, setCategory] = useState();
  const [sale, setSale] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        setName(data.name);
        setSlug(data.slug);
        setBrand(data.brand);
        setCountInStock(data.countInStock);
        setDisription(data.description);
        setPrice(data.price);
        setSale(data.sale);
        setActualPrice(data.actualPrice);
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error });
      }
    };
    fetchData();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('price', price);
    formData.append('brand', brand);
    formData.append('countInStock', countInStock);
    formData.append('discription', discription);
    formData.append('category', category);
    formData.append('actualPrice', actualPrice);

    formData.append('sale', sale);
    formData.append('image', image);
    const { data } = await axios.patch(
      `/api/admin/updateProduct/${products._id}`,
      formData
    );
  };
  // console.log(products);

  return (
    <div>
      <Container className="small-container">
        <Helmet>Add Products</Helmet>
        <h1>Add Product</h1>
        <Form onSubmit={submitHandler} encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              placeholder="Product Name..."
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="slug">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              placeholder="example: Nice-Shirt"
              type="text"
              value={slug}
              required
              onChange={(e) => setSlug(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              placeholder="Brand Name..."
              type="text"
              value={brand}
              required
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="actualPrice">
            <Form.Label>Actual Price</Form.Label>
            <Form.Control
              placeholder="Number Only"
              type="text"
              value={actualPrice}
              required
              onChange={(e) => setActualPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Sale Price</Form.Label>
            <Form.Control
              placeholder="Number Only"
              type="text"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              placeholder="Number Only"
              value={countInStock}
              required
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="disription">
            <Form.Label>Disription</Form.Label>
            <Form.Control
              as="textarea"
              row={4}
              placeholder="Details About Product"
              type="text"
              value={discription}
              required
              onChange={(e) => setDisription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="caterogy">
            <Form.Label>Caterogy</Form.Label>
            <Form.Control
              placeholder="Category"
              type="text"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="sale">
            <Form.Label>Sale in %</Form.Label>
            <Form.Control
              placeholder="Only Number"
              type="text"
              value={sale}
              required
              onChange={(e) => setSale(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Old Image</Form.Label>
            <img
              className="img-fluid rounded img-thumbnail img-zoom"
              src={products.image}
              alt=""
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              required
              onChange={(e) => setImage(e.target.files[0])}
            ></Form.Control>
          </Form.Group>

          <div className="mb-3">
            <Button type="submit">Add</Button>
          </div>
          <div className="mb-3">
            Already have account?{' '}
            {/* <Link to={`/signin?redirect=${redirect}`}>Sign In</Link> */}
          </div>
        </Form>
      </Container>
    </div>
  );
}
