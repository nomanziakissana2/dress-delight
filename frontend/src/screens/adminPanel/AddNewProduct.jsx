import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import {
  Button,
  Container,
  Form,
  FormGroup,
  FormSelect,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

export default function AddNewProduct() {
  const [name, setName] = useState();
  const [quality, setQuality] = useState();
  const [sale, setSale] = useState();
  const [slug, setSlug] = useState();
  const [brand, setBrand] = useState();
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [actualPrice, setActualPrice] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();
  // const [image2, setImage2] = useState();
  // const [image3, setImage3] = useState();
  // const [image4, setImage4] = useState();
  // const [image5, setImage5] = useState();
  // const [image6, setImage6] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('price', price);
    formData.append('actualPrice', actualPrice);
    formData.append('brand', brand);
    formData.append('sale', sale);

    formData.append('quality', quality);

    formData.append('countInStock', countInStock);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', image);
    // formData.append('image', image2);
    // formData.append('image3', image3);
    // formData.append('image4', image4);
    // formData.append('image5', image5);
    // formData.append('image6', image6);

    const { data } = await axios.post('/api/admin/addProduct', formData);
  };

  return (
    <div>
      <Container className="small-container">
        <Helmet>
          <title>Add Products</title>
        </Helmet>
        <h1>Add Product</h1>
        <Form onSubmit={submitHandler} encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              placeholder="Product Name..."
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="slug">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              placeholder="example: Nice-Shirt"
              type="text"
              required
              onChange={(e) => setSlug(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              placeholder="Brand Name..."
              type="text"
              required
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <FormGroup className="mb-3" controlId="quality">
            <Form.Label>Quality</Form.Label>
            <FormSelect onChange={(e) => setQuality(e.target.value)} required>
              <option value="Excellent">Excellent</option>
              <option value="Very Good">Very Good</option>
              <option value="Good">Good</option>
              <option value="Poor">Poor</option>
            </FormSelect>{' '}
          </FormGroup>
          <Form.Control
            placeholder="Actual Price"
            type="text"
            required
            onChange={(e) => setActualPrice(e.target.value)}
          ></Form.Control>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Salle Price</Form.Label>
            <Form.Control
              placeholder="Number Only"
              type="text"
              required
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              placeholder="Number Only"
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
              required
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="caterogy">
            <Form.Label>Caterogy</Form.Label>
            <FormSelect onChange={(e) => setCategory(e.target.value)} required>
              <option value="Pants">Pants</option>
              <option value="Shirts">Shirts</option>
              <option value="Shoes">Shoes</option>
              <option value="Garosary">Garosary</option>
              <option value="Ladies-Stich">Ladies Stich</option>
              <option value="Ladies-Unstich">Ladies-Unstich</option>
              <option value="Bed-Sheet">Bed Sheet</option>
              <option value="Under-Garments">Under Garments</option>
              <option value="Mobile">Mobile Assessroies</option>
              <option value="Other">Other</option>
            </FormSelect>{' '}
          </Form.Group>
          <Form.Group className="mb-3" controlId="sale">
            <Form.Label>Sale</Form.Label>
            <Form.Control
              placeholder="Sale"
              type="text"
              onChange={(e) => setSale(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              multiple
              type="file"
              name="image"
              required
              onChange={(e) => setImage(e.target.files[0])}
            ></Form.Control>
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="image2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              multiple
              type="file"
              name="image2"
              required
              onChange={(e) => setImage2(e.target.files[0])}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="image3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              multiple
              type="file"
              name="image3"
              required
              onChange={(e) => setImage3(e.target.files[0])}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="image4">
            <Form.Label>Image</Form.Label>
            <Form.Control
              multiple
              type="file"
              name="image4"
              required
              onChange={(e) => setImage4(e.target.files[0])}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="image5">
            <Form.Label>Image</Form.Label>
            <Form.Control
              multiple
              type="file"
              name="image5"
              required
              onChange={(e) => setImage5(e.target.files[0])}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="image6">
            <Form.Label>Image</Form.Label>
            <Form.Control
              multiple
              type="file"
              name="image6"
              required
              onChange={(e) => setImage6(e.target.files[0])}
            ></Form.Control> */}
          {/* </Form.Group> */}
          <div className="mb-3">
            <Button type="submit">Add</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
