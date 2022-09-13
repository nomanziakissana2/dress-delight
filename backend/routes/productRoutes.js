import express, { query } from 'express';
import Products from '../model/productModel.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();
productRouter.get('/isCategory', async (req, res) => {
  const products = await Products.find().distinct('category');
  // console.log({ products });
  res.send({ products });
});
const PAGE_SIZE = 500;
productRouter.get('/search', async (req, res) => {
  const { query } = req;
  // console.log(req);
  // console.log(query);
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const brand = query.brand || '';
  const price = query.price || '';
  const newprice = String(price);
  const rating = query.rating || '';
  const order = query.order || '';
  const searchQuery = query.query || '';
  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const categoryFilter =
    category && category !== 'all'
      ? {
          category,
        }
      : {};
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            //$gte(greater then equal) and $lte (less then equal) is the mongoodb operator
            $gte: Number(newprice.split('-')[0]),
            $lte: Number(newprice.split('-')[1]),
          },
        }
      : {};
  console.log(price);
  const sortOrder =
    order === 'featured'
      ? { featured: -1 }
      : order === 'lowest'
      ? { price: 1 }
      : order === 'high'
      ? { price: -1 }
      : order === 'toprate'
      ? { rating: -1 }
      : order === 'newest'
      ? { createdAt: 1 }
      : { _id: -1 };
  // console.log(sortOrder);
  const products = await Products.find({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  const countProducts = await Products.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  });
  res.send({
    products,
    countProducts,
    page,
    page: Math.ceil(countProducts / pageSize),
  });
});
productRouter.get('/', async (req, res) => {
  const products = await Products.find().sort({ _id: -1 });
  // console.log({ products });
  res.send({ products });
});
productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Products.findOne({ slug: req.params.slug });
  if (product) {
    res.send({ product, reviews: product.reviews });
    // console.log(product.reviews);
  } else {
    res.status(404).send({ mesaage: 'Product not found' });
  }
});
productRouter.get('/:id', async (req, res) => {
  const product = await Products.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ mesaage: 'Product not found' });
  }
});
productRouter.get('/:id', async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ mesaage: 'Product not found' });
  }
});

export default productRouter;
