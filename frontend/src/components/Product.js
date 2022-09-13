import React, { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Store';
// import Card.Body from 'react-bootstrap/Card.Body';

export default function Product(props) {
  const { product, rating } = props;
  console.log(rating);
  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const {
  //   cart: { cartItems },
  // } = state;
  const navigate = useNavigate();
  const addToCartHandler = async (item) => {
    // use to onclik then add to cart a item
    // const existItem = cartItems.find((x) => x._id === product._id);
    // const quantity = existItem ? existItem.quantity + 1 : 1;
    // const { data } = await axios.get(`/api/products/${item._id}`);
    // if (data.countInStock < quantity) {
    //   window.alert('Sory. Product is out of stock');
    //   return;
    // }
    // ctxDispatch({
    //   type: 'CART_ADD_ITEM',
    //   payload: { ...item, quantity },
    // });
    navigate(`/product/${item.slug}`);
  };
  return (
    <Card>
      <div>
        {product.sale !== 0 && <div className="sale-div">{product.sale}%</div>}
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top product-img"
          />
        </Link>
        <Card.Body>
          <div className="product-info">
            <Link to={`/product/${product.slug}`}></Link>
            <Card.Title>{product.name}</Card.Title>

            <Rating
              className="rating"
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
            {product.sale ? (
              <Card.Text>
                {' '}
                <strong>Rs. </strong>
                <span className={product.sale !== 0 ? 'sale-text' : null}>
                  {product.price}
                </span>
                <strong>Rs. </strong>
                {product.price - (product.price * product.sale) / 100}
              </Card.Text>
            ) : (
              <Card.Text>
                <strong>Rs. </strong>
                {product.price}
              </Card.Text>
            )}
            {product.countInStock === 0 ? (
              <Button variant="light">Out of Stock</Button>
            ) : (
              <Button onClick={() => addToCartHandler(product)}>
                {' '}
                ADD TO CART
              </Button>
            )}
          </div>
        </Card.Body>
      </div>
    </Card>
  );
}
