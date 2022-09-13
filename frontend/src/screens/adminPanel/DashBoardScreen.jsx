import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function DashBoardScreen() {
  return (
    <Container fluid="sm" className="dash">
      <Helmet>Admin Dashboard</Helmet>
      <Row>
        <div className="myrow">
          <div className="d-center">
            <div className="main">
              <Link to={'/dashboard'}>
                <img
                  className="admin-logo"
                  src="../images/home-page.png"
                  alt=""
                />
              </Link>
            </div>
            <strong>Home</strong>
          </div>
          <div className="d-center">
            <div className="main">
              <Link to={'/productList'}>
                <img className="admin-logo" src="../images/list.png" alt="" />
              </Link>
            </div>
            <strong>Products</strong>
          </div>
          <div className="d-center">
            <div className="main">
              <Link to={'/productList'}>
                <img
                  className="admin-logo"
                  src="../images/warehouse.png"
                  alt=""
                />
              </Link>
            </div>
            <strong>Add Product</strong>
          </div>
          <div className="d-center">
            <div className="main">
              <Link to={'/orderList'}>
                <img
                  className="admin-logo"
                  src="../images/checklist1.png"
                  alt=""
                />
              </Link>
            </div>
            <strong>View Orders</strong>
          </div>
          <div className="d-center">
            <div className="main">
              <Link to={'/userList'}>
                <img
                  className="admin-logo"
                  src="../images/customer.png"
                  alt=""
                />
              </Link>
            </div>
            <strong>View Users</strong>
          </div>
        </div>
      </Row>
    </Container>
  );
}
