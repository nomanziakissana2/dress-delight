import express from 'express';
import Products from '../model/productModel.js';
import mongoose from 'mongoose';

const reviewsRouter = express.Router();

reviewsRouter.post('/:id/reviews', async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Products.findById(req.params.id);
  if (product) {
    const alreadyReview = product.reviews.find(
      (r) => r.user.toString() === req.body.userId.toString()
    );
    if (alreadyReview) {
      res.status(400).send({ error: 'Already Review' });
      return;
    } else {
      const review = {
        name: req.body.name,
        rating: Number(rating),
        comment,
        user: mongoose.Types.ObjectId(req.body.userId),
      };
      product.reviews.push(review);
      if (review.rating != 0) {
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((a, item) => item.rating + a, 0) /
          product.reviews.length;
      }
      await product.save();
      res.status(201).send('Review Added Successfully');
    }
  }
});
reviewsRouter.post('/delete/:id', async (req, res) => {
  // console.log(req.body);
  const getReviews = await Products.findById({ _id: req.params.id });
  // console.log(getReviews);
  if (getReviews) {
    const index = getReviews.reviews.findIndex(
      (i) => i.user.toString() === req.body.user.toString()
    );
    if (index === -1) {
      res.send('No Data Found');
    }
    getReviews.reviews.splice(index, 1); // splice method use to remove an item from array  syntax splice(indexOfItem,Number of Items to Remove)

    getReviews.numReviews = getReviews.reviews.length;
    const len = getReviews.reviews.length;
    if (len != 0) {
      getReviews.rating =
        getReviews.reviews.reduce((a, item) => item.rating + a, 0) /
        getReviews.reviews.length;
    } else {
      getReviews.rating = 0;
    }
    getReviews.save();
    res.send({ deleteRev: true });
  }
});

export default reviewsRouter;
