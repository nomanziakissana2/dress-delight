import mongoose from 'mongoose';
const reviewsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: false },
    slug: { type: String, require: true, unique: false },
    category: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    countInStock: { type: Number, require: true },
    reviews: [reviewsSchema],
    rating: { type: Number, require: false },
    numReviews: { type: Number, require: false },
    brand: { type: String, require: true },
    description: { type: String, require: true },
    quality: { type: String },
    sale: { type: Number, default: 0 },
    actualPrice: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);
const Products = mongoose.model('Products', productSchema);
export default Products;
