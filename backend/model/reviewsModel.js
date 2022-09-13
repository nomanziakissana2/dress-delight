import mongoose from 'mongoose';
const ratingSchema = new mongoose.Schema(
  {
    product: { type: String, require: true },
    user: { type: String, require: true },
    rating: { type: Number, require: true },
  },
  {
    timeseries: true,
  }
);
const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;

const reviewsSchema = new mongoose.Schema(
  {
    product: { type: String, require: true },
    user: { type: String, require: true },
    reviews: { type: String, require: true },
  },
  {
    timeseries: true,
  }
);
const Reviews = mongoose.model('Reviews', reviewsSchema);
export { Reviews };
