import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../model/orderModel.js';
import Products from '../model/productModel.js';
import User from '../model/userModel.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/frontend/build/images/'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
// var multerUpload = upload.fields([
//   { name: 'image' },
//   { name: 'image2' },
//   { name: 'image3' },
//   { name: 'image4' },
//   { name: 'image5' },
//   { name: 'image6' },
// ]);

const adminRouter = express.Router();

adminRouter.get(
  '/orders',
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().sort({ isDelivered: false, _id: -1 });
    res.send(orders);
  })
);
adminRouter.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});
adminRouter.patch('/delivered', async (req, res) => {
  // console.log(req.body);
  const update = await Products.updateOne(
    { _id: req.body.id },
    { $set: { countInStock: req.body.quentity } }
  );
  const updateOrder = await Order.updateOne(
    { _id: req.body.orderId },
    {
      $set: {
        isDelivered: req.body.isDelivered,
      },
    }
  );
  if (update && updateOrder) {
    res.status(200).send('Update Successfuly');
  } else {
    res.status(401).send('record not found');
  }
});
// , upload.single('image')
adminRouter.post('/addProduct', upload.single('image'), async (req, res) => {
  // console.log(req.files);

  // cut down the image address from ../frontend/publice/images to=> /images/
  const newImage = req.file.destination.substring(18, 26);
  const newProduct = new Products({
    name: req.body.name,
    slug: req.body.slug,
    category: req.body.category,
    image: newImage + req.file.originalname,
    price: req.body.price,
    countInStock: req.body.countInStock,
    brand: req.body.brand,
    description: req.body.description,
    actualPrice: req.body.actualPrice,
    review: [],
    rating: 0,
    numReviews: 0,
    quality: req.body.quality,
    sale: req.body.sale,
  });
  const data = await newProduct.save();
  res.send({
    data,
  });
});
adminRouter.patch('/updateProduct/:id', async (req, res) => {
  // cut down the image address from ../frontend/publice/images to=> /images/
  // const newImage = req.file.destination.substring(18, 26);
  // console.log(req.files);
  const result = await Products.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        slug: req.body.slug,
        category: req.body.category,
        image: '/images/p4.png', //image: newImage + req.file.originalname
        price: req.body.price,
        actualPrice: req.body.actualPrice,
        countInStock: req.body.countInStock,
        brand: req.body.brand,
        description: req.body.description,

        quality: req.body.quality,
        sale: req.body.sale || 0,
      },
    }
  );
  res.send({
    result,
  });
});
adminRouter.delete('/removeProduct/:id', async (req, res) => {
  // console.log(req.params.id);
  const response = await Products.remove({ _id: req.params.id });
  if (response) {
    res.send({ data: true });
  }
});
//search Order by Name and Mobile number
adminRouter.get(`/orders/:find`, async (req, res) => {
  const name = req.params.find;
  const result = await Order.find({
    $or: [
      { 'shippingAddress.fullName': { $regex: name, $options: 'i' } },
      { 'shippingAddress.contactNumber': { $regex: name, $options: 'i' } },
    ],
  });
  res.send(result);
  console.log(result);
});
//search Order by Name and Slug
adminRouter.get(`/products/:find`, async (req, res) => {
  const name = req.params.find;
  const result = await Products.find({
    $or: [
      { slug: { $regex: name, $options: 'i' } },
      { name: { $regex: name, $options: 'i' } },
      { sale: { $gte: name } },
      { price: { $gte: name } },
    ],
  });
  res.send(result);
  console.log(result);
});
export default adminRouter;
