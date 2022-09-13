import React from 'react';
import { Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

export default function ShippingPolicy() {
  return (
    <div style={{ padding: '8rem', lineHeight: '1.5' }}>
      <Helmet>Shipping Policy</Helmet>
      <h1>Shipping Policy</h1>
      <br></br>
      <h5>SHIPMENT:</h5>
      <Row>
        <hr></hr>
        <p style={{ lineHeight: '2' }}>
          Our shipping timing for orders DELIVERY varies for different products
          and categories. It will be mentioned on the product page, informed on
          order confirmation, any delays will be informed accordingly, or if not
          informed it may be because of no communication (Email / Phone) working
          or defined. There can be unexpected delivery delays due to custom
          clearance or may be any undefined reason. The delay can further go up
          to 5-6 working days or more. We are not responsible for any kind of
          delays nor if that delay is not informed to customer for Domestic or
          International customers who gave order using any kind of payment
          method.
        </p>
        <br></br>
        <h5>DELIVERY CHARGES</h5>
        <Row>
          <hr></hr>
          <p style={{ lineHeight: '2' }}>
            Delivery charges may vary depending on the type of products ordered
            and the location you select and cannot be refunded. We take no
            responsibility it there are any additional charges in terms of
            custom or duties charged by local authorities / Governments (Out of
            Pakistan). The custom charges have to be borne by the customer
          </p>
        </Row>
      </Row>
    </div>
  );
}
