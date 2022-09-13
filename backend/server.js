import express from 'express';
// import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import reviewsRouter from './routes/reviewsRoutes.js';
import path from 'path';

dotenv.config({ path: './.env' });
// console.log(process.env.MONGODB_URI);
mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.66sjowp.mongodb.net/dress-delight?    retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.mesaage);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/admin', adminRouter);
app.use('/api/reviews', reviewsRouter);
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
app.use((err, req, res, next) => {
  res.status(500).send({ mesaage: err.mesaage });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port: ${port}`));
