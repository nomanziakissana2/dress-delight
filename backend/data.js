import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Basir',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234'),
      isAdmin: true,
      // isSeller: true,
      // seller: {
      //   name: 'Puma',
      //   logo: '/images/logo1.png',
      //   description: 'best seller',
      //   rating: 4.5,
      //   numReviews: 120,
      // },
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('12345'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Puma Slim Pant',
      slug: 'Puma-Slim-Pant',
      category: 'Pants',
      image: '/images/p5.jpg',
      price: 65,
      countInStock: 5,

      reviews: [],
      rating: 0,
      brand: 'Puma',
      rating: 3.5,
      numReviews: 10,
      description: 'high quality product',
      sale: 10,
      actualPrice: 200,
    },
  ],
};
export default data;
