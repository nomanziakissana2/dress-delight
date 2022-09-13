import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAuth2 } from '../utils.js';
import Order from '../model/orderModel.js';
const orderRouter = express.Router();
orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    const newOrder = new Order({
      orderItem: req.body.orderItem.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      actualPrice: req.body.actualPrice,
      user: req.user._id,
    });
    // console.log(newOrder);
    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);
orderRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const data = await Order.findById(req.params.id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({ message: 'Order not found' });
    }
  })
);
orderRouter.get(
  '/mine/:id',
  expressAsyncHandler(async (req, res) => {
    // console.log(req.params.id);
    const data = await Order.find({ user: req.params.id });
    res.send(data);
    // console.log(data);
  })
);

orderRouter.delete('/removeOrder/:id', async (req, res) => {
  // console.log(req.params.id);
  const response = await Order.remove({ _id: req.params.id });
  if (response) {
    res.send({ data: true });
  }
});
export default orderRouter;
