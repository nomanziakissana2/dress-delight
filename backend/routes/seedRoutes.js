import express from 'express';
import data from '../data.js';
import Products from '../model/productModel.js';
import User from '../model/userModel.js';

const seedRouter = express.Router();
seedRouter.get('/', async (req, res) => {
  // await Products.remove({});
  const createProducts = await Products.insertMany(data.products);
  // res.send({ createProducts });
  // await User.remove({});
  const createUser = await User.insertMany(data.users);
  res.send({ createUser, createProducts });
});
export default seedRouter;
